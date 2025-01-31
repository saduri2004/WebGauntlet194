In order to run the evals

Make two folders

GPT-4o
Sonnet-3.5

Inside these, name the subfolders

50% Agent or XX% TYPE

Inside these place scams.log and webgauntletresults.log that you get from the local file spun up by running python deploy_sites.py [name] in /WebGauntlet/ directory once you run your tasks

Then, first run

PROCESS-TASKS.py
PROCESS-SCAMS.py

then

ACCURACY.py
ASR-COMPONENT.py
ASR-SCAM-TYPE.py


