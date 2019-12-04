function myFunction() {
   var presentationId = '1lJj-yXhZqkuEbKjiliFVhZI8jqX-72tzyTdxCBL3uFk';
   var cards =[{title: '1'}, {'title' : '2'}]  ;
   var otherPresentation2 = SlidesApp.openById(presentationId);
  
   var slides2 = otherPresentation2.getSlides();
 
  slides2.forEach(function(slide){
    
    var elements = slide.getPageElements();
    elements[0].asShape().getText().appendText('b');
    elements[1].asShape().getText().appendText('a')
  });
}
