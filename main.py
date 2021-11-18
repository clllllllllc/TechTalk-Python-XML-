from xml.dom.minidom import parse, Node


def set_id_attribute(parent, attribute_name="id"):
    if parent.nodeType == Node.ELEMENT_NODE:
        if parent.hasAttribute(attribute_name):
            parent.setIdAttribute(attribute_name)
    for child in parent.childNodes:
        set_id_attribute(child, attribute_name)


def step1():
    with open("sample.xml") as file:
        document = parse(file)
        print(document.getElementById("bk101"))


def step2():
    with open("sample.xml") as file:
        document = parse(file)
        set_id_attribute(document)
        print(document.getElementById("bk101"))


def step3():
    with open("sample.xml") as file:
        document = parse(file)
        set_id_attribute(document)
        print(document.getElementById("bk101"))
        print(document.getElementsByTagName("price"))


def stepn():
    with open("smiley.svg") as file:
        document = parse(file)
        set_id_attribute(document)
        print(document.getElementById("smiley"))
        print(document.getElementsByTagName("ellipse"))

        try:
            print(document.querySelector("#smiley"))

        except AttributeError:
            print("does not work")


def main():
    step1()
    step2()
    step3()
    stepn()


if __name__ == "__main__":
    main()
