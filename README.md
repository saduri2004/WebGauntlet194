# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Steps to reproduce

Spin Up Web Environments: 

1) For Single Site Eval

Navigate to /WebGauntlet copy 2/ and run ./run.sh all


2) For cross site eval 

Navigate to /WebGauntlet copy 2 and run ./run.sh cross-site

Ensure ports localhost:3000-3007 are up and running with live sites



Then navigate to /WebVoyager

Run ./run_parallel.sh after configuring your OPENAI_API_KEY inside that file

COnfigure your output directoy in the same file as well 


Then run 


./run_parallel.sh <datasource_file> <run_name> <total_parallel_tasks>
"Example: ./run_parallel.sh ./data/cross_site.jsonl my_experiment 10