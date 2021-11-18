# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %% [markdown]
#
# %% [markdown]
# ## Python XML parsing
#
# ### Using xml.dom

# %%
from xml.dom.minidom import parse, parseString, Node


# %%
# opening it
document = parse("sample.xml")
print(document)


# %%
# using context manager
with open("sample.xml") as file:
    document = parse(file)
print(document)


# %%
# parsing it through a string
document = parseString(
    """<?xml version="1.0"?>
<catalog>
   <book id="bk101">
      <author>Gambardella, Matthew</author>
      <title>XML Developer's Guide</title>
      <genre>Computer</genre>
      <price>44.95</price>
      <publish_date>2000-10-01</publish_date>
      <description>An in-depth look at creating applications
      with XML.</description>
   </book>
   </catalog>"""
)
print(document)

# %% [markdown]
# #### Accessing info from XML

# %%
# It is able to return info such as version and DTD
document = parse("sample.xml")
print(document.version)
print(document.doctype)
print(document.documentElement)


# %%
# However it can't parse elements
document = parse("sample.xml")
print(document.getElementById("bk101"))
print(document.getElementById("bk102"))

# %% [markdown]
# #### Solve this issue by giving all elements an id attribute

# %%
def set_id_attribute(parent, attribute_name="id"):
    if parent.nodeType == Node.ELEMENT_NODE:
        if parent.hasAttribute(attribute_name):
            parent.setIdAttribute(attribute_name)
    for child in parent.childNodes:
        set_id_attribute(child, attribute_name)


# %%
set_id_attribute(document)
print(document.getElementById("bk101"))
print(document.getElementById("bk102"))


# %%
document = parse("smiley.svg")
set_id_attribute(document)
print(document.getElementById("smiley"))
print(document.getElementsByTagName("ellipse"))

# %% [markdown]
# #### Bad News
#

# %%
try:
    print(document.querySelector("#smiley"))
except AttributeError:
    print("does not work")

# %% [markdown]
# #### for stuff like <inkscape:custom>

# %%
document.getElementsByTagNameNS("*", "custom")


# %%
# other stuff here
with open("smiley.svg") as file:
    document = parse(file)

# %% [markdown]
# ### Using xml.sax

# %%
import xml.sax


class ParseXML(xml.sax.ContentHandler):
    def __init__(self):
        self.CurrentData = ""
        self.author = ""
        self.title = ""
        self.genre = ""
        self.price = ""
        self.publish_date = ""
        self.description = ""

    def startElement(self, tag, attributes):
        self.CurrentData = tag
        if tag == "book":
            print("--------Book--------")
            book_id = attributes["id"]
            print(f"Id: {book_id}")

    def endElement(self, tag):
        if self.CurrentData == "title":
            print(f"Title: {self.title}")
        elif self.CurrentData == "author":
            print(f"Author: {self.author}")
        elif self.CurrentData == "genre":
            print(f"genre: {self.genre}")
        elif self.CurrentData == "price":
            print(f"price: {self.price}")
        elif self.CurrentData == "publish_date":
            print(f"publish_date: {self.publish_date}")
        elif self.CurrentData == "description":
            print(f"description: {self.description}")

    def characters(self, content):
        if self.CurrentData == "title":
            self.title = content
        elif self.CurrentData == "author":
            self.author = content
        elif self.CurrentData == "genre":
            self.genre = content
        elif self.CurrentData == "price":
            self.price = content
        elif self.CurrentData == "publish_date":
            self.publish_date = content
        elif self.CurrentData == "description":
            self.description = content


parser = xml.sax.make_parser()
parser.setFeature(xml.sax.handler.feature_namespaces, 0)
parser_object = ParseXML()
parser.setContentHandler(parser_object)
parser.parse("sample.xml")

""

# %% [markdown]
# ...
# %% [markdown]
# #### Simplified version

# %%
import xml.sax


class ParseXML(xml.sax.ContentHandler):
    def __init__(self):
        self.CurrentData = ""

    def startElement(self, tag, attributes):
        self.CurrentData = tag
        if tag == "book":
            print("Book")
            book_id = attributes["id"]
            print(f"Id: {book_id}")

    def endElement(self, tag):
        print(f"{self.CurrentData}: {self.content}")

    def characters(self, content):
        self.content = content


parser = xml.sax.make_parser()
parser.setFeature(xml.sax.handler.feature_namespaces, 0)
parser_object = ParseXML()
parser.setContentHandler(parser_object)
parser.parse("sample.xml")

""
