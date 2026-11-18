/* Portfolio content: projects, GitHub repos and skills. Edit here to add or change cards. */
const projects = [
  { t: "Company Brain", sub: "Graph agent &middot; FalkorDB &middot; MCP", badge: "HACKATHON + BLOG", g: "linear-gradient(135deg,#3a0f5c 0%,#9b2fe5 55%,#ff7ad9 100%)",
    problem: "Answers about a company are scattered across people, systems and incidents, and an AI agent that cannot show its reasoning is hard to trust.", built: "An agent that answers questions over a company knowledge graph in FalkorDB. Every answer shows the exact Cypher query it ran. Includes incident response, shared agent memory and an MCP interface.",
    result: "Submitted to Graph Hacks (FalkorDB x WeMakeDevs), live demo and video available", stack: "Python, FalkorDB, Cypher, MCP, Streamlit", role: "Built it (with Claude assistance, disclosed in the README)",
    blurb: "A graph-backed agent that shows the exact query behind every answer.", tags: ["FalkorDB","Cypher","MCP","Write-up"], arch: ["Question","Agent","Cypher on FalkorDB","Answer + query"], diff: "",
    live: "https://terminatorcompanybrain.streamlit.app", src: "https://github.com/Swaroop29/company-brain", blog: "https://dev.to/swaroop_patil_d9a2f9cb9de/when-the-event-bus-fails-building-company-brain-with-falkordb-21fm" },
  { t: "AI Campaign Analytics", sub: "AWS Lambda &middot; Bedrock", badge: "AT AMAZON", g: "linear-gradient(135deg,#7a1410 0%,#e5231b 55%,#ff8a5c 100%)",
    problem: "Marketing performance reporting for EU Prime campaigns was a manual workflow for engineering and marketing teams.", built: "Designed and deployed an AI-driven campaign analytics platform on AWS Lambda and Bedrock that automates the reporting.",
    result: "Replaced a manual reporting workflow", stack: "AWS Lambda, Amazon Bedrock", role: "Designed and deployed it (EU Prime Tech, Amazon)",
    blurb: "AI-driven analytics that automates marketing performance reporting for Prime.", tags: ["Lambda","Bedrock"], arch: ["Campaign data","Lambda","Bedrock","Reports"], diff: "" },
  { t: "InfluencerConnect", sub: "Bedrock &middot; Claude &middot; FastAPI", badge: "MVP", g: "linear-gradient(135deg,#7a4a08 0%,#d9a21b 55%,#ffe08a 100%)",
    problem: "Brands find influencers by filtering spreadsheets and guessing at fit.", built: "An agentic brand and influencer matching platform. Brands describe what they want in plain language and a RAG pipeline on Bedrock and Claude finds and ranks matches.",
    result: "MVP built", stack: "Amazon Bedrock, Claude, FastAPI, RAG", role: "Built it",
    blurb: "Plain-language influencer discovery for brands, powered by RAG.", tags: ["Bedrock","Claude","FastAPI"], arch: ["Brand request","Agent","RAG on Bedrock","Ranked matches"], diff: "" },
  { t: "AI Interview Platform", sub: "Python &middot; Flask &middot; AWS", badge: "PRESENTED", g: "linear-gradient(135deg,#14307a 0%,#2b6be5 55%,#6fb7ff 100%)",
    problem: "Running and evaluating candidate interviews end to end, for many candidates at the same time.", built: "An ML-powered interview evaluation system in Python and Flask on AWS, with anomaly detection and response-quality models.",
    result: "Presented at a national poster competition (2023)", stack: "Python, Flask, AWS, ML models", role: "Built the system",
    blurb: "ML-powered interview evaluation for concurrent candidate sessions.", tags: ["Python","Flask","AWS"], arch: ["Candidate session","Flask API","ML models","Evaluation"], diff: "" },
  { t: "Green Hydrogen Optimiser", sub: "Full stack &middot; Geospatial", badge: "MSC", g: "linear-gradient(135deg,#0b4d3d 0%,#12a37f 55%,#7ee8c5 100%)",
    problem: "Planning where to generate, store and transport green hydrogen across the UK, and what that costs.", built: "A full-stack web app that simulates renewable energy generation, storage and transport across the UK, built around a geospatial cost-optimisation model.",
    result: "Cost-optimisation model and map views across the UK", stack: "GeoPandas, Cartopy, D3.js, Leaflet, Google Maps API", role: "Designed the geospatial cost-optimisation model",
    blurb: "Simulates UK renewable energy generation, storage and transport, and optimises cost.", tags: ["GeoPandas","D3.js","Leaflet"], arch: ["Geo data","Optimiser","Web app","Map views"], diff: "",
    extra: [{ l: "Read the paper", u: "https://doi.org/10.5281/zenodo.24286217" }, { l: "Read the proposal", u: "https://doi.org/10.5281/zenodo.24286313" }, { l: "Watch the talk", u: "https://youtu.be/8S3LxbVgsYU" }, { l: "View the code", u: "https://github.com/Swaroop29/HydrogenHub" }] },
  { t: "LendEase", sub: "React &middot; Python &middot; MongoDB &middot; ML", badge: "HACKATHON WINNER", g: "linear-gradient(135deg,#5c3a05 0%,#d9921b 55%,#ffe08a 100%)",
    problem: "People without easy access to traditional banking, such as international students, low-income households and minorities, face high interest rates and collateral demands when they need money in an emergency.", built: "A community-driven lending platform that pairs community lending networks with machine learning credit-assessment models, plus financial education features. Built with a React front end, a Python back end and MongoDB.",
    result: "Winner, Hack South West 2024. Written up in a published paper", stack: "React, Python, MongoDB, scikit-learn, TensorFlow", role: "Built it and wrote the paper",
    blurb: "A community lending platform that uses ML to make fair, transparent credit decisions.", tags: ["React","Python","MongoDB"], arch: ["Community","Loan request","ML credit model","Decision"], diff: "",
    extra: [{ l: "Read the paper", u: "https://doi.org/10.5281/zenodo.24286315" }] }
];
const repos = [
  { n: "company-brain", d: "Graph agent over a company knowledge graph. Shows the exact Cypher query behind every answer.", l: "Python", c: "#3572A5", s: 1, u: "https://github.com/Swaroop29/company-brain" },
  { n: "hackerrank-orchestrate-may26", d: "RAG triage agent for the HackerRank Orchestrate hackathon. Ranked 99th of 12,885.", l: "Python", c: "#3572A5", s: 0, u: "https://github.com/Swaroop29/hackerrank-orchestrate-may26" },
  { n: "HydrogenHub", d: "Geospatial cost model and interactive map for green hydrogen supply in the UK.", l: "Python", c: "#3572A5", s: 0, u: "https://github.com/Swaroop29/HydrogenHub" },
  { n: "My-City-Android-Studios-", d: "Android app for municipality complaint registration.", l: "Java", c: "#b07219", s: 0, u: "https://github.com/Swaroop29/My-City-Android-Studios-" },
  { n: "Online-Food-Management", d: "DBMS mini project: online food management system.", l: "PHP", c: "#4F5D95", s: 0, u: "https://github.com/Swaroop29/Online-Food-Management" }
];
const skills = [
  { n: "Java", s: "Languages", g: "linear-gradient(160deg,#7a1410,#e5231b)" },
  { n: "Python", s: "Languages", g: "linear-gradient(160deg,#14307a,#2b6be5)" },
  { n: "AWS", s: "Cloud", g: "linear-gradient(160deg,#7a4a08,#d9a21b)" },
  { n: "React", s: "Frontend", g: "linear-gradient(160deg,#0b4d3d,#12a37f)" },
  { n: "AI / LLMs", s: "Bedrock &middot; RAG", g: "linear-gradient(160deg,#4a1a7a,#9b5be5)" },
  { n: "Distributed Systems", s: "Backend", g: "linear-gradient(160deg,#5a0f2e,#d6336c)" },
  { n: "Node.js", s: "Backend", g: "linear-gradient(160deg,#1c4a12,#5aa832)" },
  { n: "SQL", s: "Data", g: "linear-gradient(160deg,#0d4a5c,#1fa5c9)" },
  { n: "DynamoDB", s: "AWS &middot; NoSQL", g: "linear-gradient(160deg,#3a1a7a,#6b6bf0)" },
  { n: "Microservices", s: "Architecture", g: "linear-gradient(160deg,#5c3a0d,#e0803a)" }
];
