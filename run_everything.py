import subprocess

commands = [
    "cd backend && mvn clean package spring-boot:run",
    "cd frontend && npm run dev",
]

processes = []


for command in commands:
    p = subprocess.Popen([
        "konsole",
        "-e",
        "bash",
        "-c",
        command
    ])
    processes.append(p)

for p in processes:
    p.wait()