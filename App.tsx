import React, { useState } from 'react';
import Header from './components/Header';
import BlueprintForm from './components/BlueprintForm';
import ResultDisplay from './components/ResultDisplay';
import { generateBlueprint } from './services/geminiService';
import { UserInput, SunoBlueprintResponse, LoadingState } from './types';
import { AlertCircle, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<SunoBlueprintResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<UserInput | null>(null);

  const handleFormSubmit = async (input: UserInput) => {
    setLoadingState(LoadingState.LOADING);
    setError(null);
    setResult(null);
    setLastInput(input);

    try {
      const data = await generateBlueprint(input);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err: any) {
      setError(err.message || "Ceva a mers prost în timpul generării blueprint-ului.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleRetry = () => {
    if (lastInput) {
      handleFormSubmit(lastInput);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans selection:bg-suno-primary selection:text-white pb-20">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 space-y-12">
        <section className="flex flex-col items-center justify-center space-y-6">
          <div className="text-center max-w-xl space-y-2">
            <h2 className="text-2xl font-bold text-white">Creează-ți Sunetul</h2>
            <p className="text-white/50">
              Introdu conceptul tău mai jos. AI Arhitectul va construi prompt-urile Suno optime și structura lirică pentru o generare de calitate profesională.
            </p>
          </div>
          
          <BlueprintForm 
            onSubmit={handleFormSubmit} 
            loadingState={loadingState}
          />
        </section>

        {loadingState === LoadingState.ERROR && (
          <div className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 shadow-lg shadow-red-900/10">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <p className="text-sm md:text-base font-medium">{error}</p>
            </div>
            {lastInput && (
              <button 
                onClick={handleRetry}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <RefreshCw className="w-4 h-4" />
                Încearcă din nou
              </button>
            )}
          </div>
        )}

        {result && (
          <section className="border-t border-white/5 pt-12">
             <div className="flex items-center justify-center mb-8">
              <span className="bg-[#09090b] px-4 text-sm font-mono text-white/40 uppercase tracking-widest">
                Blueprint Generat
              </span>
             </div>
            <ResultDisplay data={result} />
          </section>
        )}
      </main>

      <footer className="text-center py-8 text-white/20 text-xs">
        <p>Folosește rezultatele generate în modul Custom al Suno AI.</p>
        <p className="mt-1">© {new Date().getFullYear()} Suno AI Arhitect</p>
      </footer>
    </div>
  );
};

export default App;