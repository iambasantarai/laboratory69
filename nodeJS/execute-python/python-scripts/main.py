import os
import sys
import platform
import pyfiglet

def system_fetch():
    title = pyfiglet.figlet_format("System Information", font = "digital")
    print(title)
    print("OS: ", os.name)
    print("System: ", platform.system())
    print("Architecture: ", platform.machine())

def parse_arguments(arguments):
    args_dict = {}
    for arg in arguments:
        if '=' in arg:
            key, value = arg.split('=', 1)
            args_dict[key] = value
    return args_dict

def main():
    args = sys.argv[1:]
    args_dict = parse_arguments(args)

    # Accessing arguments individually
    sk = args_dict.get('-sk', None)
    oc = args_dict.get('-oc', None)
    nc = args_dict.get('-nc', None)

    print(f"Argument -sk: {sk}")
    print(f"Argument -oc: {oc}")
    print(f"Argument -nc: {nc}")

    system_fetch()

if __name__ == "__main__":
    main()
