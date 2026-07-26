"use client";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="text-center pt-16 pb-8">
      <Sparkles className="w-12 h-12 text-sky-500 mx-auto mb-4" />
      <h2 className="text-3xl font-bold text-white mb-3">Find Papers. Challenge Claims.</h2>
      <p className="text-gray-400 max-w-lg mx-auto">
        Search millions of research papers via OpenAlex and generate AI counter-arguments for your thesis.
      </p>
    </div>
  );
}