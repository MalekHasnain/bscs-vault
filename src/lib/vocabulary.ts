// Vocabulary for VU BSCS Semester 1 subjects.
// Curated key terms + exam-oriented definitions, grouped by subject code.
// Add more subjects here as semesters unlock — the /vocabulary page and
// subject pages pick this file up automatically.

export type VocabTerm = {
  term: string;
  definition: string;
};

export type VocabSubject = {
  code: string;
  title: string;
  terms: VocabTerm[];
};

export const VOCABULARY: VocabSubject[] = [
  {
    code: "CS101",
    title: "Introduction to Computing",
    terms: [
      {
        term: "Computer",
        definition:
          "An electronic device that accepts data (input), processes it according to stored instructions, and produces meaningful information (output).",
      },
      {
        term: "Hardware",
        definition:
          "The physical, touchable components of a computer system — CPU, memory, keyboard, monitor, storage devices.",
      },
      {
        term: "Software",
        definition:
          "The set of programs (instructions) and associated data that tell the hardware what to do. Divided into system software and application software.",
      },
      {
        term: "CPU (Central Processing Unit)",
        definition:
          "The 'brain' of the computer where instructions are executed. Its main parts are the ALU (arithmetic/logic operations), the Control Unit (directs the flow), and registers.",
      },
      {
        term: "RAM (Random Access Memory)",
        definition:
          "Volatile main memory that holds the programs and data currently in use. Its contents are lost when power is switched off.",
      },
      {
        term: "ROM (Read-Only Memory)",
        definition:
          "Non-volatile memory that permanently stores startup instructions (firmware/BIOS). Contents survive power-off and normally cannot be modified.",
      },
      {
        term: "Bit",
        definition:
          "The smallest unit of data in computing — a single binary digit, either 0 or 1.",
      },
      {
        term: "Byte",
        definition:
          "A group of 8 bits. The standard unit for measuring storage capacity (KB, MB, GB, TB).",
      },
      {
        term: "Operating System",
        definition:
          "System software that manages hardware resources and provides an interface between the user and the machine — e.g. Windows, Linux, macOS.",
      },
      {
        term: "Application Software",
        definition:
          "Programs built for end-user tasks rather than running the machine — e.g. MS Word, web browsers, games.",
      },
      {
        term: "Compiler",
        definition:
          "A translator that converts an entire high-level language program into machine code in one go, before execution. Reports all errors together after scanning the whole program.",
      },
      {
        term: "Interpreter",
        definition:
          "A translator that converts and executes high-level code one statement at a time, stopping at the first error it meets.",
      },
      {
        term: "Algorithm",
        definition:
          "A finite, step-by-step sequence of unambiguous instructions designed to solve a specific problem.",
      },
      {
        term: "Flowchart",
        definition:
          "A diagrammatic representation of an algorithm using standard symbols (oval = start/end, parallelogram = input/output, rectangle = process, diamond = decision).",
      },
      {
        term: "Pseudocode",
        definition:
          "An informal, English-like notation that describes an algorithm's logic without obeying any programming language's strict syntax.",
      },
      {
        term: "Computer Network",
        definition:
          "Two or more computers connected together to share data and resources. A LAN covers a small area (one building); a WAN spans cities or countries.",
      },
      {
        term: "URL (Uniform Resource Locator)",
        definition:
          "The unique address used to locate a specific resource on the World Wide Web, e.g. https://example.com/page.",
      },
      {
        term: "Database",
        definition:
          "An organized collection of related data stored so it can be searched, updated, and retrieved efficiently — e.g. a DBMS like MySQL.",
      },
    ],
  },
  {
    code: "CS201",
    title: "Introduction to Programming",
    terms: [
      {
        term: "Variable",
        definition:
          "A named memory location whose value can change during program execution.",
      },
      {
        term: "Constant",
        definition:
          "A named value that is fixed at the time of definition and cannot be changed while the program runs (e.g. const double PI = 3.14159;).",
      },
      {
        term: "Data Type",
        definition:
          "Defines what kind of data a variable can hold and what operations are allowed on it — e.g. int, float, double, char, bool.",
      },
      {
        term: "Identifier",
        definition:
          "A programmer-chosen name for a variable, function, or object. Must start with a letter or underscore and cannot be a keyword.",
      },
      {
        term: "Keyword",
        definition:
          "A reserved word with a special, fixed meaning in the language (int, if, while, return) that can never be used as an identifier.",
      },
      {
        term: "Operator",
        definition:
          "A symbol that performs an operation on values — arithmetic (+, -, *, /, %), relational (<, >, ==), logical (&&, ||, !), assignment (=).",
      },
      {
        term: "Expression",
        definition:
          "A meaningful combination of operators and operands that evaluates to a single value, e.g. (a + b) * c.",
      },
      {
        term: "Statement",
        definition:
          "A complete instruction that causes an action. In C/C++ most statements end with a semicolon.",
      },
      {
        term: "Syntax",
        definition:
          "The formal grammar rules of a language — how a program must be written for the compiler to accept it.",
      },
      {
        term: "Semantics",
        definition:
          "The meaning of a program — what its instructions actually do when executed. A program can be syntactically correct yet semantically wrong.",
      },
      {
        term: "Conditional Statement",
        definition:
          "A control structure (if, if-else, switch) that selects which block of code executes based on whether a condition is true or false.",
      },
      {
        term: "Loop",
        definition:
          "A control structure that repeats a block of code: for (fixed count), while (condition-checked first), do-while (condition-checked last).",
      },
      {
        term: "Function",
        definition:
          "A named, reusable block of code that performs a specific task, may accept inputs, and may return a value.",
      },
      {
        term: "Parameter vs Argument",
        definition:
          "A parameter is the placeholder name in a function's definition; an argument is the actual value passed to it at call time.",
      },
      {
        term: "Array",
        definition:
          "A collection of elements of the same data type stored in contiguous memory locations and accessed by index (starting at 0).",
      },
      {
        term: "Pointer",
        definition:
          "A variable that stores the memory address of another variable. Dereferencing (*) accesses the value at that address.",
      },
      {
        term: "Class",
        definition:
          "A user-defined data type that bundles data members and member functions into one unit. A class is a blueprint; objects are its instances.",
      },
      {
        term: "Encapsulation",
        definition:
          "Bundling data and the functions that operate on it inside a class, while hiding internal details from the outside (data hiding).",
      },
      {
        term: "Inheritance",
        definition:
          "An OOP mechanism where a derived class acquires the properties and behavior of an existing base class, promoting code reuse.",
      },
      {
        term: "Polymorphism",
        definition:
          "'Many forms' — the same function call behaves differently depending on the object or context (e.g. function overloading, overriding).",
      },
      {
        term: "IDE (Integrated Development Environment)",
        definition:
          "A single application combining editor, compiler/interpreter, and debugger for writing programs — e.g. Dev-C++, Visual Studio, VS Code.",
      },
    ],
  },
  {
    code: "ENG101",
    title: "English Comprehension",
    terms: [
      {
        term: "Reading Comprehension",
        definition:
          "The ability to understand a text's meaning, purpose, tone, and implications — not just its individual words.",
      },
      {
        term: "Skimming",
        definition:
          "Reading quickly through a text to grasp its general idea or gist — headings, first lines, key phrases.",
      },
      {
        term: "Scanning",
        definition:
          "Running your eyes quickly over a text to locate specific information such as a name, date, or figure.",
      },
      {
        term: "Main Idea",
        definition:
          "The central point the author wants to convey in a passage; every paragraph supports it.",
      },
      {
        term: "Topic Sentence",
        definition:
          "The sentence — usually the first in a paragraph — that states its main idea. The rest of the paragraph gives supporting details.",
      },
      {
        term: "Supporting Details",
        definition:
          "Facts, examples, reasons, or statistics that explain and develop the main idea of a paragraph.",
      },
      {
        term: "Context Clues",
        definition:
          "Hints in the words and sentences around an unfamiliar word that help you guess its meaning without a dictionary.",
      },
      {
        term: "Inference",
        definition:
          "A conclusion reached from evidence and reasoning rather than from statements directly written in the text — 'reading between the lines'.",
      },
      {
        term: "Paraphrasing",
        definition:
          "Restating a passage in your own words while keeping the original meaning and roughly the same length.",
      },
      {
        term: "Summarizing",
        definition:
          "Briefly restating only the main points of a text in your own words — much shorter than the original.",
      },
      {
        term: "Synonym",
        definition:
          "A word with nearly the same meaning as another word, e.g. begin/start, big/large.",
      },
      {
        term: "Antonym",
        definition:
          "A word with the opposite meaning of another, e.g. hot/cold, increase/decrease.",
      },
      {
        term: "Prefix",
        definition:
          "A letter or group of letters added to the beginning of a word to change its meaning — un-, re-, dis-, pre-.",
      },
      {
        term: "Suffix",
        definition:
          "A letter or group of letters added to the end of a word to change its meaning or grammatical class — -ness, -ful, -ly, -tion.",
      },
      {
        term: "Metaphor",
        definition:
          "A direct comparison between two unlike things without using 'like' or 'as' — 'Time is money.'",
      },
      {
        term: "Simile",
        definition:
          "A comparison between two things using 'like' or 'as' — 'as brave as a lion.'",
      },
      {
        term: "Tone",
        definition:
          "The author's attitude toward the subject or reader — formal, ironic, serious, humorous — conveyed through word choice.",
      },
      {
        term: "Fact vs Opinion",
        definition:
          "A fact can be proved or verified; an opinion is a personal judgment or belief that cannot be proved true or false.",
      },
    ],
  },
  {
    code: "MTH202",
    title: "Discrete Mathematics",
    terms: [
      {
        term: "Proposition",
        definition:
          "A declarative sentence that is either true or false, but not both. 'Islamabad is the capital of Pakistan' is a proposition; 'Close the door' is not.",
      },
      {
        term: "Truth Value",
        definition:
          "The truth (T) or falsity (F) of a proposition.",
      },
      {
        term: "Tautology",
        definition:
          "A compound statement that is true for every possible combination of truth values of its components — e.g. p ∨ ¬p.",
      },
      {
        term: "Contradiction",
        definition:
          "A compound statement that is false for every possible combination of truth values — e.g. p ∧ ¬p.",
      },
      {
        term: "Negation (¬p)",
        definition:
          "'Not p' — the statement that is true exactly when p is false, and vice versa.",
      },
      {
        term: "Conjunction (p ∧ q)",
        definition:
          "'p and q' — true only when both p and q are true; false otherwise.",
      },
      {
        term: "Disjunction (p ∨ q)",
        definition:
          "'p or q' — false only when both p and q are false; true otherwise.",
      },
      {
        term: "Implication (p → q)",
        definition:
          "'If p then q' — false only in the single case where p is true and q is false. p is the hypothesis, q is the conclusion.",
      },
      {
        term: "Converse",
        definition:
          "Of p → q, the converse is q → p. It is not logically equivalent to the original statement.",
      },
      {
        term: "Contrapositive",
        definition:
          "Of p → q, the contrapositive is ¬q → ¬p. It is always logically equivalent to the original implication.",
      },
      {
        term: "Set",
        definition:
          "A well-defined collection of distinct objects. Objects in a set are its elements, written a ∈ A.",
      },
      {
        term: "Subset (A ⊆ B)",
        definition:
          "A is a subset of B if every element of A is also an element of B.",
      },
      {
        term: "Union (A ∪ B)",
        definition:
          "The set of elements that belong to A, to B, or to both.",
      },
      {
        term: "Intersection (A ∩ B)",
        definition:
          "The set of elements common to both A and B. If A ∩ B = ∅ the sets are disjoint.",
      },
      {
        term: "Power Set",
        definition:
          "The set of all subsets of a set A, denoted P(A). If |A| = n then |P(A)| = 2ⁿ.",
      },
      {
        term: "Venn Diagram",
        definition:
          "A diagram in which sets are drawn as circles inside a rectangle representing the universal set U, used to visualize unions, intersections and differences.",
      },
      {
        term: "Function (Mapping)",
        definition:
          "A rule that assigns to each element of a set A (domain) exactly one element of a set B (codomain). The set of images is the range.",
      },
      {
        term: "Injective, Surjective, Bijective",
        definition:
          "Injective (one-to-one): distinct inputs give distinct outputs. Surjective (onto): every codomain element is hit. Bijective: both — a perfect pairing.",
      },
      {
        term: "Mathematical Induction",
        definition:
          "A proof technique: show P(n₀) is true (base case), then show P(k) → P(k+1) (inductive step). Conclude P(n) for all n ≥ n₀.",
      },
      {
        term: "Pigeonhole Principle",
        definition:
          "If n items are placed into k boxes and n > k, then at least one box contains more than one item.",
      },
      {
        term: "Graph",
        definition:
          "A structure of vertices (points) connected by edges (lines). A tree is a connected graph with no cycles.",
      },
    ],
  },
  {
    code: "MTH5101",
    title: "Calculus I",
    terms: [
      {
        term: "Limit",
        definition:
          "The value that f(x) approaches as x approaches a point a, written lim(x→a) f(x) = L. The function need not be defined at a itself.",
      },
      {
        term: "One-Sided Limits",
        definition:
          "The left-hand limit (x → a⁻) and right-hand limit (x → a⁺). The limit exists only if both exist and are equal.",
      },
      {
        term: "Continuity",
        definition:
          "A function is continuous at x = a if the limit as x → a exists, equals f(a), and f is defined at a — the graph has no break, jump, or hole there.",
      },
      {
        term: "Discontinuity",
        definition:
          "A break in the graph of a function — removable (a hole that can be patched) or non-removable (jump or infinite).",
      },
      {
        term: "Derivative",
        definition:
          "The instantaneous rate of change of a function at a point; geometrically, the slope of the tangent line to the curve there.",
      },
      {
        term: "Differentiation",
        definition:
          "The process of finding a derivative — applying rules such as the power, product, quotient and chain rules.",
      },
      {
        term: "Power Rule",
        definition:
          "d/dx (xⁿ) = n·xⁿ⁻¹ — bring down the exponent, reduce it by one.",
      },
      {
        term: "Product Rule",
        definition:
          "d/dx (u·v) = u′v + uv′ — differentiate one factor at a time and add.",
      },
      {
        term: "Quotient Rule",
        definition:
          "d/dx (u/v) = (u′v − uv′) / v², valid where v ≠ 0.",
      },
      {
        term: "Chain Rule",
        definition:
          "For a composite function y = f(g(x)): dy/dx = f′(g(x))·g′(x) — differentiate the outer function, then multiply by the derivative of the inner.",
      },
      {
        term: "Critical Point",
        definition:
          "An interior point where f′(x) = 0 or f′(x) does not exist — the only candidates for local extrema.",
      },
      {
        term: "Local Maximum / Minimum",
        definition:
          "A point where f is greater (max) or smaller (min) than at all nearby points — the peaks and valleys of the graph.",
      },
      {
        term: "First Derivative Test",
        definition:
          "At a critical point: if f′ changes + → − it is a local max; − → + a local min; no sign change means neither.",
      },
      {
        term: "Second Derivative Test",
        definition:
          "At a critical point where f″ ≠ 0: f″ < 0 indicates a local maximum, f″ > 0 a local minimum.",
      },
      {
        term: "Concavity",
        definition:
          "A curve is concave up where f″ > 0 (opens upward, holds water) and concave down where f″ < 0 (opens downward, spills water).",
      },
      {
        term: "Inflection Point",
        definition:
          "A point where the curve changes concavity (f″ changes sign).",
      },
      {
        term: "Asymptote",
        definition:
          "A line the graph approaches without ever touching: vertical (x = a, function blows up), horizontal (y = L, end behavior), or oblique (slanted).",
      },
      {
        term: "Indefinite Integral",
        definition:
          "An antiderivative: ∫ f(x) dx = F(x) + C, where F′ = f. The constant C represents the whole family of antiderivatives.",
      },
      {
        term: "Definite Integral",
        definition:
          "∫ from a to b of f(x) dx — the (signed) area under the curve between x = a and x = b. The Fundamental Theorem of Calculus evaluates it as F(b) − F(a).",
      },
      {
        term: "Integration",
        definition:
          "The reverse process of differentiation — finding a function from its rate of change; also used for areas, volumes, and accumulations.",
      },
    ],
  },
  {
    code: "PSY101",
    title: "Introduction to Psychology",
    terms: [
      {
        term: "Psychology",
        definition:
          "The scientific study of behavior and mental processes — what people do and what happens in their minds.",
      },
      {
        term: "Behavior",
        definition:
          "Any observable action or reaction of a person — talking, walking, crying — that can be seen and measured.",
      },
      {
        term: "Cognition",
        definition:
          "The mental processes of thinking, remembering, perceiving, reasoning, and problem-solving.",
      },
      {
        term: "Neuron",
        definition:
          "The basic structural and functional unit of the nervous system, made of dendrites (receive), a cell body, and an axon (transmits).",
      },
      {
        term: "Synapse",
        definition:
          "The microscopic gap between two neurons, across which messages pass chemically via neurotransmitters.",
      },
      {
        term: "Neurotransmitter",
        definition:
          "A chemical messenger released into the synapse that carries the signal to the next neuron — e.g. dopamine, serotonin.",
      },
      {
        term: "Central Nervous System (CNS)",
        definition:
          "The brain and spinal cord — the body's main information-processing and decision-making center.",
      },
      {
        term: "Sensation",
        definition:
          "The raw detection of stimuli by the sense organs — light, sound, pressure — before any interpretation.",
      },
      {
        term: "Perception",
        definition:
          "The process of selecting, organizing, and interpreting sensations into a meaningful experience of the world.",
      },
      {
        term: "Classical Conditioning",
        definition:
          "Pavlov's learning by association: a neutral stimulus (bell) repeatedly paired with an unconditioned stimulus (food) comes to trigger the same response (salivation).",
      },
      {
        term: "Operant Conditioning",
        definition:
          "Skinner's learning by consequences: behavior followed by reinforcement strengthens, behavior followed by punishment weakens.",
      },
      {
        term: "Reinforcement",
        definition:
          "Any consequence that increases a behavior. Positive adds something pleasant; negative removes something unpleasant.",
      },
      {
        term: "Punishment",
        definition:
          "Any consequence that decreases the behavior it follows.",
      },
      {
        term: "Short-Term vs Long-Term Memory",
        definition:
          "Short-term (working) memory holds a small amount of information for seconds; long-term memory is the relatively permanent, unlimited store.",
      },
      {
        term: "Encoding, Storage, Retrieval",
        definition:
          "The three memory processes: putting information in (encoding), keeping it (storage), and getting it back out (retrieval).",
      },
      {
        term: "Motivation",
        definition:
          "The internal process that arouses, energizes, and directs behavior toward a goal — hunger drives eating, ambition drives study.",
      },
      {
        term: "Emotion",
        definition:
          "A stirred-up state involving physiological arousal (racing heart), subjective experience (feeling), and outward expression (facial, gestures).",
      },
      {
        term: "Id, Ego, Superego",
        definition:
          "Freud's three parts of personality: the id demands instant gratification, the superego is the moral conscience, the ego realistically balances the two.",
      },
      {
        term: "The Unconscious",
        definition:
          "In Freud's theory, the reservoir of thoughts, wishes, and fears outside awareness that still influences behavior.",
      },
      {
        term: "Nature vs Nurture",
        definition:
          "The classic debate over whether heredity (genes) or environment (upbringing, experience) shapes behavior more — modern answer: both interact.",
      },
      {
        term: "Behaviorism",
        definition:
          "The school (Watson, Skinner) holding that psychology should study only observable behavior, not invisible mental processes.",
      },
      {
        term: "Psychoanalysis",
        definition:
          "Freud's theory of personality and therapy method, emphasizing unconscious conflicts and early childhood experiences.",
      },
    ],
  },
  {
    code: "ECO401",
    title: "Economics",
    terms: [
      {
        term: "Economics",
        definition:
          "The social science studying how individuals, firms, and societies allocate scarce resources among unlimited, competing wants.",
      },
      {
        term: "Scarcity",
        definition:
          "The fundamental economic problem: wants are unlimited but resources (land, labor, capital) are limited, forcing choices.",
      },
      {
        term: "Microeconomics",
        definition:
          "The branch dealing with individual decision-making units — a consumer, a firm, a single market.",
      },
      {
        term: "Macroeconomics",
        definition:
          "The branch dealing with economy-wide aggregates — national income, GDP, inflation, unemployment, economic growth.",
      },
      {
        term: "Opportunity Cost",
        definition:
          "The value of the next-best alternative given up when a choice is made — the real cost of every decision.",
      },
      {
        term: "Demand",
        definition:
          "The quantity of a good buyers are willing and able to purchase at each price in a given period.",
      },
      {
        term: "Supply",
        definition:
          "The quantity of a good producers are willing and able to sell at each price in a given period.",
      },
      {
        term: "Law of Demand & Supply",
        definition:
          "Other things equal, quantity demanded falls as price rises (inverse), while quantity supplied rises as price rises (direct) — the two curves slope oppositely.",
      },
      {
        term: "Market Equilibrium",
        definition:
          "The price at which quantity demanded equals quantity supplied; the market clears with no shortage or surplus.",
      },
      {
        term: "Surplus & Shortage",
        definition:
          "A surplus exists when quantity supplied exceeds quantity demanded (price above equilibrium); a shortage is the reverse (price below).",
      },
      {
        term: "Price Elasticity of Demand",
        definition:
          "The responsiveness of quantity demanded to a price change: %ΔQd ÷ %ΔP. Elastic (>1), inelastic (<1), or unit elastic (=1).",
      },
      {
        term: "Utility",
        definition:
          "The satisfaction a consumer gets from consuming a good or service.",
      },
      {
        term: "Marginal Utility",
        definition:
          "The extra satisfaction from consuming one more unit of a good. The Law of Diminishing Marginal Utility says it falls as consumption increases.",
      },
      {
        term: "GDP (Gross Domestic Product)",
        definition:
          "The total market value of all final goods and services produced within a country's borders in a given period.",
      },
      {
        term: "Inflation",
        definition:
          "A sustained rise in the general price level, which reduces the purchasing power of money. A sustained fall in prices is deflation.",
      },
      {
        term: "Unemployment",
        definition:
          "The situation where members of the labor force are actively seeking work but cannot find a job.",
      },
      {
        term: "Fiscal Policy",
        definition:
          "The government's use of taxes and spending to influence output, employment and prices.",
      },
      {
        term: "Monetary Policy",
        definition:
          "The central bank's (SBP in Pakistan) management of money supply and interest rates to steer the economy.",
      },
      {
        term: "Perfect Competition",
        definition:
          "A market with many small sellers of an identical product, free entry and exit, and perfect information — firms are price takers.",
      },
      {
        term: "Monopoly",
        definition:
          "A market with a single seller of a product with no close substitutes — the firm is a price maker.",
      },
      {
        term: "Oligopoly",
        definition:
          "A market dominated by a few large interdependent firms — e.g. telecoms or airlines.",
      },
    ],
  },
  {
    code: "MCM101",
    title: "Introduction to Mass Communication",
    terms: [
      {
        term: "Communication",
        definition:
          "The process of sharing information, ideas, and feelings between people through verbal and non-verbal symbols.",
      },
      {
        term: "Mass Communication",
        definition:
          "The process of delivering messages through mass media (TV, radio, newspapers, internet) to a large, heterogeneous, geographically scattered audience.",
      },
      {
        term: "Media",
        definition:
          "The channels or vehicles that carry messages to audiences — print, broadcast, and digital/new media.",
      },
      {
        term: "Sender (Encoder)",
        definition:
          "The originator of the message who converts ideas into symbols — words, images, sounds — that can be transmitted.",
      },
      {
        term: "Receiver (Decoder)",
        definition:
          "The audience member who receives the message and interprets its meaning.",
      },
      {
        term: "Message",
        definition:
          "The actual content — information, ideas, or emotions — being communicated.",
      },
      {
        term: "Channel",
        definition:
          "The medium through which the message travels from sender to receiver.",
      },
      {
        term: "Feedback",
        definition:
          "The receiver's response returned to the sender, completing the communication loop — letters, calls, comments, ratings.",
      },
      {
        term: "Noise",
        definition:
          "Any interference — physical, psychological, or semantic — that distorts or blocks the message during transmission.",
      },
      {
        term: "Gatekeeping",
        definition:
          "The process by which editors and media managers decide which information passes through to the audience and which is filtered out.",
      },
      {
        term: "Agenda Setting",
        definition:
          "The media's power to tell us what to think about — issues given heavy coverage become the issues the public considers important.",
      },
      {
        term: "Public Opinion",
        definition:
          "The collective attitude or view of the majority of people in a society on a particular issue.",
      },
      {
        term: "Propaganda",
        definition:
          "One-sided, deliberately persuasive communication designed to shape beliefs and behavior, often by ignoring or distorting facts.",
      },
      {
        term: "Journalism",
        definition:
          "The professional practice of gathering, verifying, writing, and reporting news.",
      },
      {
        term: "News",
        definition:
          "A timely report of an event that is new, unusual, significant, or of interest to the audience.",
      },
      {
        term: "Broadcast vs Print Media",
        definition:
          "Broadcast media transmit electronically (TV, radio) to mass audiences; print media publish physically (newspapers, magazines).",
      },
      {
        term: "Censorship",
        definition:
          "The suppression or banning of media content by an authority — government, editor, or regulator.",
      },
      {
        term: "Stereotype",
        definition:
          "A fixed, oversimplified, widely held image or assumption about a group of people, often reinforced by media portrayal.",
      },
    ],
  },
  {
    code: "SOC101",
    title: "Introduction to Sociology",
    terms: [
      {
        term: "Sociology",
        definition:
          "The scientific study of society, social institutions, and social relationships — how people behave in groups.",
      },
      {
        term: "Society",
        definition:
          "A group of people who share a common territory and culture and interact continuously with one another.",
      },
      {
        term: "Culture",
        definition:
          "The shared way of life of a group — its beliefs, values, norms, language, and material objects passed from generation to generation.",
      },
      {
        term: "Material vs Non-Material Culture",
        definition:
          "Material culture is the physical objects a society creates (tools, buildings, dress); non-material culture is its ideas, beliefs, norms and values.",
      },
      {
        term: "Socialization",
        definition:
          "The lifelong process by which individuals learn their culture and learn to function as members of society — through family, school, peers, media.",
      },
      {
        term: "Norm",
        definition:
          "A shared rule or expectation about how people should behave in a given situation.",
      },
      {
        term: "Folkways & Mores",
        definition:
          "Folkways are everyday customs whose violation brings mild disapproval (dress style, table manners); mores are morally significant norms whose violation brings severe sanctions (theft, dishonesty).",
      },
      {
        term: "Value",
        definition:
          "A culturally shared standard of what is good, right, and desirable — the goals society considers worth pursuing.",
      },
      {
        term: "Sanction",
        definition:
          "A reward or punishment used to encourage conformity to norms — praise and prizes, or fines and imprisonment.",
      },
      {
        term: "Status (Ascribed & Achieved)",
        definition:
          "A social position a person occupies. Ascribed status is assigned at birth (sex, family); achieved status is earned through effort (graduate, officer).",
      },
      {
        term: "Role",
        definition:
          "The set of expected behaviors attached to a status — a 'teacher' status carries the role of instructing and grading.",
      },
      {
        term: "Social Institution",
        definition:
          "An established, organized system that meets a basic need of society — family, religion, education, economy, government.",
      },
      {
        term: "Social Stratification",
        definition:
          "The hierarchical ranking of categories of people into layers of unequal wealth, power, and prestige.",
      },
      {
        term: "Social Mobility",
        definition:
          "Movement between social positions — vertical (up or down the stratification ladder) or horizontal (same level, different position).",
      },
      {
        term: "Ethnocentrism",
        definition:
          "Judging other cultures by the standards of one's own culture and seeing one's own as superior.",
      },
      {
        term: "Cultural Relativism",
        definition:
          "The practice of understanding and evaluating a culture on its own terms, rather than by outside standards.",
      },
      {
        term: "Culture Lag",
        definition:
          "W. F. Ogburn's term for the delay of non-material culture (values, laws) in catching up with rapidly changing material culture (technology).",
      },
      {
        term: "Primary vs Secondary Group",
        definition:
          "A primary group is small, intimate, and enduring (family, close friends); a secondary group is larger, formal, and goal-oriented (office, class).",
      },
      {
        term: "Deviance",
        definition:
          "Behavior that violates a society's norms — from minor breaches to serious crimes.",
      },
      {
        term: "Anomie",
        definition:
          "Durkheim's term for a state of normlessness — when society's norms are weak or unclear, individuals feel disconnected.",
      },
    ],
  },
];

// Fast lookup by subject code (used by subject pages to link vocabulary).
export const VOCAB_BY_CODE: Record<string, VocabSubject> = Object.fromEntries(
  VOCABULARY.map((s) => [s.code, s]),
);

export const TOTAL_VOCAB_TERMS = VOCABULARY.reduce(
  (sum, s) => sum + s.terms.length,
  0,
);
