import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, History, X, Calculator, Moon, Sun } from 'lucide-react';

interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
}

export default function App() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [animateResult, setAnimateResult] = useState(false);

  const handleNumber = useCallback((num: string) => {
    if (lastResult) {
      setDisplay(num);
      setExpression(num);
      setLastResult(null);
      return;
    }
    if (display === '0' && num !== '.') {
      setDisplay(num);
      setExpression((prev) => (prev === '' || prev === '0' ? num : prev + num));
    } else {
      if (num === '.' && display.includes('.')) return;
      setDisplay((prev) => prev + num);
      setExpression((prev) => prev + num);
    }
  }, [display, lastResult]);

  const handleOperator = useCallback((op: string) => {
    setLastResult(null);
    const lastChar = expression.slice(-1);
    if (['+', '-', '×', '÷'].includes(lastChar)) {
      setExpression((prev) => prev.slice(0, -1) + op);
    } else {
      setExpression((prev) => prev + op);
    }
    setDisplay('0');
  }, [expression]);

  const calculate = useCallback(() => {
    try {
      const evalExpr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/[^0-9+\-*/.() ]/g, '');

      // Safe evaluation
      const fn = new Function(`return ${evalExpr}`);
      const result = fn();

      if (result === undefined || result === null || isNaN(result)) {
        setDisplay('Error');
        return;
      }

      const formatted = Number.isInteger(result)
        ? result.toString()
        : parseFloat(result.toFixed(8)).toString();

      setAnimateResult(true);
      setTimeout(() => setAnimateResult(false), 300);

      setDisplay(formatted);
      setExpression(formatted);
      setLastResult(formatted);

      const entry: HistoryEntry = {
        id: Date.now().toString(),
        expression: expression,
        result: formatted,
      };
      setHistory((prev) => [entry, ...prev].slice(0, 20));
    } catch {
      setDisplay('Error');
    }
  }, [expression]);

  const clear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setLastResult(null);
  }, []);

  const backspace = useCallback(() => {
    if (lastResult) {
      clear();
      return;
    }
    if (display.length > 1) {
      setDisplay((prev) => prev.slice(0, -1));
      setExpression((prev) => prev.slice(0, -1));
    } else {
      setDisplay('0');
      setExpression((prev) => (prev.length <= 1 ? '' : prev.slice(0, -1)));
    }
  }, [display, lastResult, clear]);

  const handlePercent = useCallback(() => {
    const current = parseFloat(display);
    if (!isNaN(current)) {
      const result = (current / 100).toString();
      setDisplay(result);
      setExpression((prev) => {
        const parts = prev.split(/([+\-×÷])/);
        parts[parts.length - 1] = result;
        return parts.join('');
      });
    }
  }, [display]);

  const handleToggleSign = useCallback(() => {
    if (display !== '0') {
      const newDisplay = display.startsWith('-') ? display.slice(1) : '-' + display;
      setDisplay(newDisplay);
      setExpression((prev) => {
        const parts = prev.split(/([+\-×÷])/);
        const last = parts[parts.length - 1];
        parts[parts.length - 1] = last.startsWith('-') ? last.slice(1) : '-' + last;
        return parts.join('');
      });
    }
  }, [display]);

  const clearHistory = () => setHistory([]);

  // Button definitions
  const buttons = [
    { label: 'AC', action: clear, type: 'function' as const, span: 1 },
    { label: '±', action: handleToggleSign, type: 'function' as const, span: 1 },
    { label: '%', action: handlePercent, type: 'function' as const, span: 1 },
    { label: '÷', action: () => handleOperator('÷'), type: 'operator' as const, span: 1 },
    { label: '7', action: () => handleNumber('7'), type: 'number' as const, span: 1 },
    { label: '8', action: () => handleNumber('8'), type: 'number' as const, span: 1 },
    { label: '9', action: () => handleNumber('9'), type: 'number' as const, span: 1 },
    { label: '×', action: () => handleOperator('×'), type: 'operator' as const, span: 1 },
    { label: '4', action: () => handleNumber('4'), type: 'number' as const, span: 1 },
    { label: '5', action: () => handleNumber('5'), type: 'number' as const, span: 1 },
    { label: '6', action: () => handleNumber('6'), type: 'number' as const, span: 1 },
    { label: '-', action: () => handleOperator('-'), type: 'operator' as const, span: 1 },
    { label: '1', action: () => handleNumber('1'), type: 'number' as const, span: 1 },
    { label: '2', action: () => handleNumber('2'), type: 'number' as const, span: 1 },
    { label: '3', action: () => handleNumber('3'), type: 'number' as const, span: 1 },
    { label: '+', action: () => handleOperator('+'), type: 'operator' as const, span: 1 },
    { label: '0', action: () => handleNumber('0'), type: 'number' as const, span: 2 },
    { label: '.', action: () => handleNumber('.'), type: 'number' as const, span: 1 },
    { label: '=', action: calculate, type: 'equals' as const, span: 1 },
  ];

  const getButtonStyle = (type: string, label: string) => {
    const isActive = expression.endsWith(label) && ['+', '-', '×', '÷'].includes(label);

    if (type === 'operator') {
      return isActive
        ? 'bg-white text-amber-500'
        : darkMode
        ? 'bg-amber-500 text-white hover:bg-amber-400'
        : 'bg-amber-500 text-white hover:bg-amber-400';
    }
    if (type === 'equals') {
      return darkMode
        ? 'bg-emerald-500 text-white hover:bg-emerald-400'
        : 'bg-emerald-500 text-white hover:bg-emerald-400';
    }
    if (type === 'function') {
      return darkMode
        ? 'bg-gray-600 text-white hover:bg-gray-500'
        : 'bg-gray-300 text-gray-900 hover:bg-gray-400';
    }
    return darkMode
      ? 'bg-gray-700 text-white hover:bg-gray-600'
      : 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-200';
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}
    >
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            darkMode ? 'bg-indigo-500' : 'bg-indigo-300'
          }`}
        />
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            darkMode ? 'bg-purple-500' : 'bg-purple-300'
          }`}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`font-bold text-lg leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Calculadora
              </h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                React + Tailwind
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2.5 rounded-xl transition-colors ${
                darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              } ${showHistory ? 'ring-2 ring-indigo-500' : ''}`}
            >
              <History className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl transition-colors ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Calculator body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl overflow-hidden shadow-2xl ${
            darkMode ? 'bg-gray-800/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'
          } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          {/* Display */}
          <div className={`p-6 pb-4 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}>
            <div
              className={`text-right text-sm h-6 truncate ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {expression || ' '}
            </div>
            <motion.div
              key={display}
              initial={animateResult ? { scale: 1.1, color: '#10b981' } : { scale: 1 }}
              animate={{ scale: 1, color: darkMode ? '#ffffff' : '#111827' }}
              transition={{ duration: 0.2 }}
              className={`text-right font-bold mt-2 truncate ${
                display.length > 12 ? 'text-3xl' : display.length > 8 ? 'text-4xl' : 'text-5xl'
              } ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {display}
            </motion.div>
          </div>

          {/* Backspace */}
          <div className="px-6 pb-2 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={backspace}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Delete className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Buttons grid */}
          <div className="p-4 grid grid-cols-4 gap-3">
            {buttons.map((btn) => (
              <motion.button
                key={btn.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={btn.action}
                className={`${getButtonStyle(btn.type, btn.label)} ${
                  btn.span === 2 ? 'col-span-2' : ''
                } h-16 rounded-2xl font-semibold text-xl shadow-md transition-colors flex items-center justify-center`}
              >
                {btn.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* History panel */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className={`mt-4 rounded-3xl overflow-hidden shadow-2xl ${
                darkMode ? 'bg-gray-800/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'
              } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="p-4 flex items-center justify-between">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Historial
                </h3>
                <div className="flex gap-2">
                  {history.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className={`text-xs px-3 py-1 rounded-lg ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      Limpiar
                    </button>
                  )}
                  <button
                    onClick={() => setShowHistory(false)}
                    className={`p-1 rounded-lg ${
                      darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="px-4 pb-4 max-h-64 overflow-y-auto space-y-2">
                {history.length === 0 ? (
                  <p className={`text-center py-6 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Sin operaciones aún
                  </p>
                ) : (
                  history.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => {
                        setDisplay(entry.result);
                        setExpression(entry.result);
                        setLastResult(entry.result);
                      }}
                      className={`p-3 rounded-xl cursor-pointer transition-colors ${
                        darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {entry.expression}
                      </div>
                      <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        = {entry.result}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
