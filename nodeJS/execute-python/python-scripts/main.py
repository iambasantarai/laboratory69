import os
import platform
import pyfiglet

def system_fetch():
    title = pyfiglet.figlet_format("System Information", font = "digital")
    print(title)
    print("OS: ", os.name)
    print("System: ", platform.system())
    print("Architecture: ", platform.machine())

system_fetch()
