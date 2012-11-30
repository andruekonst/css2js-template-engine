css2js-template-engine
======================

CSS-styled language compilator written in js

Syntax:

[tag1]<#.>{

  ... <CSS Styles, tag1 parameters> ...
  
  content: <Content>;
  
  [tag2]<#.>{
  
    ... <CSS Styles, tag2 parameters> ...
    
    content: <Content>;
    
  }
  
  content: <Content>;
  
}


Example:

div#test-id.test-class{

  background: black;
  
  color: white;
  
  content: Input example;
  
  input#test-input{
  
    type: text;
    
    value: Test;
    
  }
  
  input#test-button{
  
    type: button;
    
    value: Ok;
    
  }
  
  content: Press Ok button;
  
}