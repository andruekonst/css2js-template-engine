CSS2JS-template-engine
======================

CSS-styled language compilator written in js

Algorithm:
----------------------
Converting css-styled tags to html, adding content, adding childs, generating js to add events, css and additional html parameters

Syntax:
----------------------
Tag expression: 

    tag-type#tag-id.tag-class1 tag-class2

Content block: content: "content";

Example:
----------------------
    div#test-id.test class{
      content: "Test";
      div#child.child styled button{
        onclick: test();
        a{
          content: Test Button;
          href: #;
        }
      }
    }