# To assemble the userscript, we only need to perform two string replacements.
# So, a custom script seems simpler than using a JS build tool.

from glob import glob
import os
import re


ANNOTATION_LIB = os.path.join("annotationlib", "dist")
USERSCRIPT_NAME = "annotations-restored-embed"


def read(filename):
    with open(filename) as f:
        return f.read()


def sub(pattern, repl, string):
    if re.search(pattern, string) is None:
        raise Exception(f"Failed to find pattern `{pattern}` in userscript")
    return re.sub(pattern, repl, string)


if __name__ == "__main__":
    js = "".join(read(f) for f in glob(os.path.join(ANNOTATION_LIB, "*.js")))
    css = "".join(read(f) for f in glob(os.path.join(ANNOTATION_LIB, "*.css")))

    userscript = read(USERSCRIPT_NAME + ".js")
    userscript = sub(r"// %%ANNOTATION_LIB%%.*", js, userscript)
    userscript = sub(r"%%ANNOTATION_RENDERER_CSS%%[^`]*", css, userscript)

    with open(os.path.join("..", USERSCRIPT_NAME + ".user.js"), "w") as f:
        f.write(userscript)
