import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, SunoBlueprintResponse } from "../types";

const SYSTEM_INSTRUCTION = `
## ROL
Ești "Suno AI Arhitect Român", un expert în crearea de blueprint-uri muzicale (Stil & Versuri) pentru Suno AI, specializat în muzica românească în toate formele ei.

## CUNOȘTINȚE MUZICALE ROMÂNEȘTI
Ești expert în toate genurile muzicale românești:

### MANELE
- **Manele Clasice / Lăutărești** (Florin Salam, Nicolae Guță, Dănuț Lupu):
  - *Instrumente*: Accordeon, Keyboard Orient, Darbuka/Davul, Bass Sintetizat, Vioară Lăutărească.
  - *Voce*: Voce masculină puternică cu ornamente orientale (melisme), vibrato intens, urlete dramatice.
  - **TAGS OBLIGATORII**: `Romanian Manele`, `Oriental Folk`, `Lautareasca`, `Accordion`, `Melismatic Vocals`, `Emotional`, `Passionate`.

- **Manele Moderne** (Florin Salam nou, Bogdan de la Ploiești, Tzancă Uraganu):
  - *Instrumente*: Beat Electronic + Keyboard Orient + Bas Pulsant + uneori Trap Hi-Hats.
  - *Voce*: Auto-tuned sau semi-auto-tuned, stil modern dar cu ornamente.
  - **TAGS**: `Modern Romanian Manele`, `Oriental Pop`, `Electronic Beat`, `Auto-tuned`, `Emotional Pop`.

### MUZICĂ POPULARĂ ROMÂNEASCĂ (FOLCLOR)
- **Populară Ardeleană** (dans vioi, "de doi", "de trei"):
  - *Instrumente*: Vioară, Cobză, Țimbalom, Fluier, Acordeon.
  - *Tempo*: Rapid, ritm de dans.
  - **TAGS**: `Romanian Folk`, `Transylvanian Folk`, `Fiddle`, `Lively Dance`, `Traditional Romanian`.

- **Populară Moldovenească** (joc, horă, sârbă):
  - *Instrumente*: Nai, Fluier, Vioară, Acordeon, Cobză.
  - **TAGS**: `Moldavian Folk`, `Romanian Folk`, `Hora`, `Flute`, `Festive`.

- **Populară Oltenească** (ritm alert, strigături):
  - *Instrumente*: Acordeon, Vioară, Taragot.
  - **TAGS**: `Oltenia Folk`, `Romanian Folk`, `Accordion`, `Energetic`, `Folk Dance`.

- **Doina** (cântec de dor, melancolic, liber):
  - *Caracter*: Fără ritm fix, improvizație liberă, profund emoțional.
  - *Voce*: Plâns vocal, ornamente lungi, suspin, ton de jale.
  - **TAGS**: `Romanian Doina`, `Free Rhythm`, `Melancholic`, `Soulful`, `Traditional Romanian Lament`.

### MUZICĂ LĂUTĂREASCĂ
- *Instrumente*: Vioară (principal), Contrabasuri, Acordeon, Țimbalom, Clarinet.
- *Caracter*: Virtuozitate instrumentală, dans și petrecere.
- **TAGS**: `Lautareasca`, `Romanian Gypsy Music`, `Virtuoso Violin`, `Festive`, `Improvisation`.

### POP ROMÂNESC
- **Pop Romantic** (Ștefan Bănică Jr., Andreea Marin, Anda Adam):
  - **TAGS**: `Romanian Pop`, `Romantic Ballad`, `Orchestral`, `Emotional`, `Pop Ballad`.
- **Pop Modern** (Smiley, Antonia, Irina Rimes):
  - **TAGS**: `Romanian Pop`, `Modern Pop`, `Upbeat`, `Radio Friendly`.

### ETNO-POP / WORLD FUSION
- Combinație de folclor autentic cu producție modernă (Zdob și Zdub, Subcarpați, Mahala Raï Banda).
- **TAGS**: `Romanian Ethno-Pop`, `World Music`, `Folk Fusion`, `Traditional Modern`.

### MUZICĂ DE PETRECERE
- Ritmuri vioaie, sârbă, horă, dedicată petrecerilor și nunților.
- **TAGS**: `Romanian Party Music`, `Wedding Music`, `Hora`, `Sarba`, `Festive Romanian`.

### COLINDE
- *Caracter*: Sacru, tradițional, de Crăciun/sărbători.
- **TAGS**: `Romanian Colinde`, `Christmas Carol`, `Traditional`, `Sacred`, `Choir`.

### ROCK / HIP-HOP ROMÂNESC
- **Rock Românesc** (Iris, Phoenix, Cargo, Voltaj): `Romanian Rock`, `Balada Rock`, `Classic Rock Romania`.
- **Hip-Hop Românesc** (Parazitii, Cedry2k, Killa Fonic): `Romanian Hip-Hop`, `Trap Romanesc`, `Street Romanian`.

## PROTOCOL ANALIZĂ AUDIO
Dacă utilizatorul furnizează un fișier audio, efectuează **ANALIZĂ SONORĂ PROFUNDĂ**:

1. **Gen Specific**: Identifică exact sub-genul românesc (nu folosi termeni generici).
2. **Epocă & Producție**: Detectează decada (ex: "90s Lăutăresc", "Manele 2000s", "Folk Tradițional").
3. **Instrumente Cheie**: Identifică instrumentele care definesc caracterul piesei.
4. **Voce**: Descrie textura vocală (ex: "Tenor Înalt cu Ornamente Orientale", "Soprană Populară").

### IMPORTANT
Audio este doar pentru referință de **STIL/VIBE**. NU COPIA NICIODATĂ versuri din audio. Versurile generate trebuie să fie 100% ORIGINALE.

## WORKFLOW
1. Analizează Input-ul (Audio profund, Text, & Setări Avansate).
2. Generează Titlu: Creativ, artistic, relevant pentru mood/temă.
3. Generează Stil: Maxim 120 caractere pentru câmpul Suno Style.
4. Generează Versuri: Cu structură clară folosind tag-uri [Paranteze Drepte].

## REGULI STIL SUNO
- **LIMITĂ STRICTĂ**: 'suno_style' trebuie să fie sub 120 caractere.
- **PRIORITATE**: Tag Gen > Mood > Instrumente > Voce.
- **PENTRU MANELE**: Folosește "Romanian Manele, Oriental Folk, Accordion, Passionate Vocals".
- **PENTRU DOINĂ**: Folosește "Romanian Doina, Free Rhythm, Soulful, Melancholic".
- **PENTRU FOLCLOR**: Specifică regiunea (Transylvanian/Moldavian/Oltenia Folk).

## REGULI VERSURI
- Urmează EXACT 'Structura Blueprint' furnizată de utilizator.
- **CRITIC: NU COPIA VERSURI DIN AUDIO. SCRIE VERSURI NOI.**
- Folosește tag-uri structurale în română: [Intro], [Strofa 1], [Refren], [Bridge], [Outro].
- Scrie versuri în **ROMÂNĂ**, cu rimă naturală și ritm potrivit genului.
- Pentru Doină: versuri libere, cu dor, jale, nostalgie.
- Pentru Manele: versuri pasionale, despre iubire, bani, prieteni, viață.
- Pentru Folclor: versuri tradiționale, despre natură, sat, familie, sărbători.

### PROTOCOL DUET
Dacă vocea este "Duet Bărbat-Femeie":
1. Etichetează fiecare secțiune: \`[Voce Masculină]\`, \`[Voce Feminină]\`, \`[Împreună]\`.
2. Creează dialoguri tip "Chemare și Răspuns" în Bridge.

## FUNCȚII AVANSATE
- **MOD EARWORM**: Refren scurt, extrem de repetitiv, rimă simplă și memorabilă.
- **UMANIZARE VOCALĂ**: Inserează tag-uri vocale: [respiratie], [oftat], [sunet], [soptit], [strigat].
- **GHID MELODIE**: Adaugă indicații melodice în paranteze drepte: [urcare], [coborare], [legato], [staccato].
- **ARMONII VOCALE**: Adaugă [Armonie], [Voci Fundal], [Cor], [Strat Vocal] în Refren.

## FORMAT OUTPUT
Returnează un obiect JSON.
`;

export const generateBlueprint = async (input: UserInput): Promise<SunoBlueprintResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("Cheia API lipsește. Asigurați-vă că process.env.API_KEY este configurat.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const contents: any[] = [];
  
  if (input.audioData) {
    contents.push({
      inlineData: {
        mimeType: input.audioMimeType || 'audio/mp3',
        data: input.audioData
      }
    });
  }

  let promptText = `Creează un blueprint Suno AI (Titlu, Stil, Versuri) pentru următorul concept muzical românesc.`;

  if (input.audioData) {
    promptText += `
    IMPORTANT: A fost furnizat un fișier audio de referință.
    1. **ANALIZĂ PROFUNDĂ NECESARĂ**: Ascultă cu atenție audio-ul.
    2. **DISTINCȚIE CRITICĂ GEN ROMÂNESC**:
       - Dacă sună ca **Manele Clasice** (Florin Salam, Nicolae Guță): Clasifică drept "Romanian Manele, Lautareasca, Oriental Folk".
       - Dacă sună ca **Muzică Populară** (folclor regional): Specifică regiunea (Ardeleană/Moldovenească/Oltenească).
       - Dacă sună ca **Doină**: Clasifică drept "Romanian Doina, Free Rhythm, Melancholic".
       - Dacă sună ca **Muzică Lăutărească**: Folosește "Lautareasca, Romanian Gypsy Music, Virtuoso Violin".
    3. **ANALIZEAZĂ TEXTURA**: Identifică Decada, Tipul Vocal, și Instrumentele Cheie.
    4. **CONSTRUIEȘTE STILUL**: Folosește aceste caracteristici pentru 'suno_style'.
    5. CRITIC: NU TRANSCRIE VERSURILE DIN AUDIO. Generează versuri 100% ORIGINALE.
    `;
  }

  promptText += `
    Preferințele Utilizatorului:
    - Gen/Stil Input: ${input.genre || "Analizează din audio (Fii specific! Evită termeni generici)"}
    - Mood/Atmosferă Input: ${input.mood || "Analizează din audio"}
    
    - Voce Input: ${input.vocals.includes('Auto') ? "ANALIZEAZĂ DIN AUDIO (Identifică dacă e Masculin/Feminin/Duet/etc)" : input.vocals}
    - Tempo Input: ${input.tempo.includes('Auto') ? "ANALIZEAZĂ DIN AUDIO (Identifică intervalul BPM)" : input.tempo}
    - Limbă: ${input.language.includes('Auto') ? "ANALIZEAZĂ DIN AUDIO (Identifică limba, implicit Română)" : input.language}
    
    - Instrumente Specifice (TREBUIE INCLUSE ÎN STIL): ${input.instruments && input.instruments.length > 0 ? input.instruments.join(', ') : "Niciunul selectat"}
    
    - Detalii Suplimentare: ${input.additionalDetails}
    
    TEXTURĂ DE PRODUCȚIE: ${input.productionTexture} (Asigură-te că această caracteristică sonoră este inclusă explicit în 'suno_style').

    STRUCTURA BLUEPRINT: ${input.structure ? input.structure : "AUTO-DETECT (Dacă există audio, analizează și mimează structura lui. Dacă nu, alege ce se potrivește cel mai bine genului)."}

    SETĂRI AVANSATE:
    - MOD EARWORM: ${input.isEarworm ? "ACTIVAT (Fă-l extrem de memorabil și repetitiv)" : "Dezactivat"}
    - UMANIZARE VOCALĂ: ${input.isHumanize ? "ACTIVAT (Injectează respirații, oftaturi, etc)" : "Dezactivat"}
    - GHID MELODIE: ${input.isMelodyGuide ? "ACTIVAT (Adaugă tag-uri instrucționale folosind DOAR PARANTEZE DREPTE [ ])" : "Dezactivat"}
    - ARMONII VOCALE: ${input.isHarmony ? "ACTIVAT (Include tag-uri de armonie [Armonie] sau [Voci Fundal] în versuri și stil)" : "Dezactivat"}
  `;

  contents.push({ text: promptText });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: input.audioData ? { parts: contents } : contents[contents.length - 1].text,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suno_title: {
              type: Type.STRING,
              description: "Un titlu creativ, catchy și relevant pentru melodie, în română.",
            },
            suno_style: {
              type: Type.STRING,
              description: "Prompt-ul de stil optimizat pentru Suno (max 120 caractere). Derivat din referința audio dacă există. Include textura de producție și instrumentele specifice solicitate.",
            },
            suno_lyrics: {
              type: Type.STRING,
              description: "Versurile complete cu tag-uri structurale în paranteze drepte. Structura TREBUIE să urmeze 'Structura Blueprint' furnizată. Include tag-uri [respiratie] dacă Umanizarea e activată. Versurile trebuie să fie ORIGINALE, nu copia din audio. Dacă e Duet, urmează strict regulile de etichetare Duet.",
            },
            analysis: {
              type: Type.STRING,
              description: "Explicație scurtă în română despre de ce a fost aleasă această combinație, menționând sub-genul specific detectat din audio.",
            },
          },
          required: ["suno_title", "suno_style", "suno_lyrics", "analysis"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as SunoBlueprintResponse;
    }
    throw new Error("Nu a fost generat niciun răspuns.");
  } catch (error: any) {
    console.error("Eroare Gemini API:", error);
    
    if (error.status === 429) {
      throw new Error("⚠️ Trafic Ridicat: Serverul este ocupat (Rate Limit). Te rugăm să aștepți 1 minut și să apeși butonul Încearcă din nou.");
    }
    if (error.status === 503) {
      throw new Error("⚠️ Server Supraîncărcat: AI-ul procesează multe cereri. Încearcă din nou în câteva momente.");
    }
    if (error.message && error.message.includes("SAFETY")) {
      throw new Error("⚠️ Filtru de Siguranță: Cererea a fost respinsă deoarece conținutul a fost considerat inadecvat. Încearcă să modifici descrierea melodiei.");
    }

    throw new Error("Conectarea la AI Arhitect a eșuat. Verifică conexiunea sau încearcă din nou mai târziu.");
  }
};