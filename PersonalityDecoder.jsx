import { useState, useEffect } from "react";

const API_KEY = "AIzaSyAFYUvSqfH5QCdNtffXh2YmM_EQeh8z-xg";

const SYSTEM_PROMPT = `You are a personality analysis engine. The user has written a short paragraph about themselves. Analyze it and return ONLY a valid JSON object — no explanation, no markdown, no code fences. The JSON must follow this exact structure:

{
  "traits": [
    { "name": "string", "score": number between 1 and 100, "description": "1-2 sentence description" },
    { "name": "string", "score": number, "description": "..." },
    { "name": "string", "score": number, "description": "..." },
    { "name": "string", "score": number, "description": "..." }
  ],
  "communicationStyle": "2-3 sentence summary of how this person communicates",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "growthAreas": ["area 1", "area 2", "area 3"],
  "summary": "A single elegant sentence summarizing the person's overall personality profile"
}

Provide exactly 4 traits. Keep all text concise and thoughtful. Do not use generic platitudes.`;

export default function PersonalityDecoder() {
  const [appState, setAppState] = useState("idle");
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState(null);
  const [animateResults, setAnimateResults] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    if (appState === "result") {
      const timer = setTimeout(() => setAnimateResults(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateResults(false);
    }
  }, [appState]);

  const analyzeText = async () => {
    if (!userInput.trim() || userInput.length < 20) return;

    setAppState("loading");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: [
              {
                role: "user",
                parts: [{ text: userInput }],
              },
            ],
            generationConfig: {
              maxOutputTokens: 1000,
              temperature: 0.7,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      const raw = data.candidates[0].content.parts[0].text;
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      setResult(parsed);
      setAppState("result");
    } catch (error) {
      console.error("Analysis failed:", error);
      setAppState("error");
    }
  };

  const resetApp = () => {
    setAppState("idle");
    setUserInput("");
    setResult(null);
    setAnimateResults(false);
  };

  return (
    <div
      className="min-h-screen px-6 py-12 md:py-12"
      style={{
        backgroundColor: "#0f0e0d",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @keyframes pulse-loading {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .loading-dot {
          animation: pulse-loading 1.4s ease-in-out infinite;
        }
        .loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .loading-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      <div className="max-w-[720px] mx-auto">
        {/* Header */}
        <header
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            appState === "idle" ? "opacity-100 translate-y-0" : "opacity-100"
          }`}
        >
          <h1
            className="text-5xl md:text-6xl tracking-wide mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              color: "#f0ece4",
              letterSpacing: "0.02em",
            }}
          >
            Personality Decoder
          </h1>
          <p
            className="text-base"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              color: "#9e9a92",
              fontSize: "15px",
            }}
          >
            Write freely. Understand deeply.
          </p>
          <div
            className="mt-8 mx-auto w-24 h-px"
            style={{ backgroundColor: "#2e2b26" }}
          />
        </header>

        {/* Input Section */}
        {(appState === "idle" || appState === "loading") && (
          <section
            className={`transition-all duration-500 ease-out ${
              appState === "loading" ? "opacity-70" : "opacity-100"
            }`}
          >
            <div
              className="relative rounded-sm"
              style={{ backgroundColor: "#1a1815" }}
            >
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={appState === "loading"}
                placeholder="Write a few sentences about yourself. How you think, how you feel, what drives you. There is no right way to do this."
                className="w-full min-h-[180px] md:min-h-[180px] p-6 bg-transparent resize-none outline-none border-b-2 transition-colors duration-300 focus:border-[#c9a96e] disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: 1.8,
                  color: "#f0ece4",
                  borderColor: "#2e2b26",
                }}
              />
              <style>{`
                textarea::placeholder {
                  color: #5a5750;
                }
              `}</style>
            </div>

            <div
              className="mt-3 text-right text-xs"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                color: "#5a5750",
              }}
            >
              {userInput.length} characters
            </div>

            <button
              onClick={analyzeText}
              disabled={appState === "loading" || userInput.length < 20}
              className="w-full mt-6 h-[52px] bg-transparent border rounded-sm transition-all duration-400 ease-out hover:bg-[#c9a96e] hover:text-[#0f0e0d] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#c9a96e] group"
              style={{
                borderColor: "#c9a96e",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "18px",
                letterSpacing: "2px",
                color: "#c9a96e",
              }}
            >
              {appState === "loading" ? (
                <span className="flex items-center justify-center gap-1">
                  <span
                    className="loading-dot inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#c9a96e" }}
                  />
                  <span
                    className="loading-dot inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#c9a96e" }}
                  />
                  <span
                    className="loading-dot inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#c9a96e" }}
                  />
                </span>
              ) : (
                "ANALYZE"
              )}
            </button>
          </section>
        )}

        {/* Results Section */}
        {appState === "result" && result && (
          <section className="space-y-12">
            {/* Summary */}
            <div
              className={`pt-8 border-t transition-all duration-600 ease-out ${
                animateResults
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                borderColor: "#2e2b26",
                transitionDelay: "0ms",
              }}
            >
              <p
                className="text-center italic"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "22px",
                  lineHeight: 1.6,
                  color: "#f0ece4",
                }}
              >
                <span style={{ color: "#c9a96e" }}>"</span>
                {result.summary}
                <span style={{ color: "#c9a96e" }}>"</span>
              </p>
            </div>

            {/* Personality Traits */}
            <div
              className={`transition-all duration-600 ease-out ${
                animateResults
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.traits.map((trait, index) => (
                  <div
                    key={trait.name}
                    className={`p-6 border rounded-sm transition-all duration-300 ease-out hover:border-[#c9a96e] hover:bg-[#222018] ${
                      animateResults
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{
                      backgroundColor: "#1a1815",
                      borderColor: "#2e2b26",
                      transitionDelay: `${120 + index * 80}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="uppercase tracking-wider"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                          fontSize: "13px",
                          letterSpacing: "1.5px",
                          color: "#9e9a92",
                        }}
                      >
                        {trait.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 400,
                          fontSize: "28px",
                          color: "#c9a96e",
                        }}
                      >
                        {trait.score}
                      </span>
                    </div>

                    <div
                      className="w-full h-1 rounded-sm overflow-hidden mb-3"
                      style={{ backgroundColor: "#2e2b26" }}
                    >
                      <div
                        className="h-full rounded-sm transition-all duration-800 ease-out"
                        style={{
                          backgroundColor: "#c9a96e",
                          width: animateResults ? `${trait.score}%` : "0%",
                          transitionDelay: `${400 + index * 100}ms`,
                        }}
                      />
                    </div>

                    <p
                      className="mt-3"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: "14px",
                        lineHeight: 1.7,
                        color: "#9e9a92",
                      }}
                    >
                      {trait.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Communication Style */}
            <div
              className={`transition-all duration-600 ease-out ${
                animateResults
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "480ms" }}
            >
              <div
                className="pl-5 border-l-2"
                style={{ borderColor: "#c9a96e" }}
              >
                <span
                  className="block uppercase tracking-widest mb-3"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "11px",
                    letterSpacing: "2px",
                    color: "#5a5750",
                  }}
                >
                  Communication Style
                </span>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: 1.8,
                    color: "#f0ece4",
                  }}
                >
                  {result.communicationStyle}
                </p>
              </div>
            </div>

            {/* Strengths and Growth Areas */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-600 ease-out ${
                animateResults
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              {/* Strengths */}
              <div>
                <span
                  className="block uppercase tracking-widest mb-4"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "11px",
                    letterSpacing: "2px",
                    color: "#c9a96e",
                  }}
                >
                  Strengths
                </span>
                <div>
                  {result.strengths.map((strength, index) => (
                    <div
                      key={index}
                      className="py-3 border-b"
                      style={{
                        borderColor: "#2e2b26",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: "15px",
                        color: "#f0ece4",
                      }}
                    >
                      {strength}
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth Areas */}
              <div>
                <span
                  className="block uppercase tracking-widest mb-4"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "11px",
                    letterSpacing: "2px",
                    color: "#5a5750",
                  }}
                >
                  Growth Areas
                </span>
                <div>
                  {result.growthAreas.map((area, index) => (
                    <div
                      key={index}
                      className="py-3 border-b"
                      style={{
                        borderColor: "#2e2b26",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 300,
                        fontSize: "15px",
                        color: "#f0ece4",
                      }}
                    >
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div
              className={`transition-all duration-600 ease-out ${
                animateResults
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "720ms" }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "12px",
                  lineHeight: 1.6,
                  color: "#5a5750",
                }}
              >
                This analysis is generated by AI based on writing patterns and
                is intended for reflective purposes only. It is not a clinical
                assessment, psychological evaluation, or diagnostic tool.
                Results should not be used to make decisions about yourself or
                others.
              </p>
            </div>

            {/* Reset Button */}
            <div
              className={`text-center transition-all duration-600 ease-out ${
                animateResults
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "840ms" }}
            >
              <button
                onClick={resetApp}
                className="bg-transparent border-none cursor-pointer transition-all duration-300 hover:text-[#f0ece4] hover:underline"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  letterSpacing: "1px",
                  color: "#9e9a92",
                }}
              >
                Analyze another
              </button>
            </div>
          </section>
        )}

        {/* Error State */}
        {appState === "error" && (
          <section className="text-center py-16">
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "24px",
                color: "#f0ece4",
              }}
            >
              Something went wrong
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "15px",
                color: "#9e9a92",
              }}
            >
              The analysis could not be completed. Please try again.
            </p>
            <button
              onClick={resetApp}
              className="bg-transparent border-none cursor-pointer transition-all duration-300 hover:text-[#f0ece4] hover:underline"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                letterSpacing: "1px",
                color: "#9e9a92",
              }}
            >
              Analyze another
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
