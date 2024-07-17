import os
import platform

def system_fetch():
    print("OS: ", os.name)
    print("System: ", platform.system())
    print("Architecture: ", platform.machine())

system_fetch()
