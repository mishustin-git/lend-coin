// export function characteristic() {
var fps = 60;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;
var border_out = document.getElementById("border-out"),
  ctx = border_out.getContext('2d'),
  h = border_out.height,
  w = border_out.width;
var shortLines = 0;
var lineSizeX, shortLines = 0;
var maxLineSizeX = 50,   maxShortLineSize = 30;
var innerLineX = 0,   maxInnerLineX = w,   deltaPathBorder = 15.5;
var innerLineY = 0,   maxInnerLineY = h;
var outerLineX = 0,   maxOuterLineX = w;
var outerLineY = 0,   maxOuterLineY = h;
var outerLineYY = 0;
var outerLineXX = 0
var deltaPath = 1.1;
line3=0;
line4=0;
var color1 = "#FF9924";
var color2 = ctx.createLinearGradient(w,0,w,h);
color2.addColorStop("0","#FF9924");
color2.addColorStop("1","#C03B1A");
var color3 = "#C03B1A";
var color4 = ctx.createLinearGradient(0,h,0,0);
color4.addColorStop("0","#C03B1A");
color4.addColorStop("1","#FF9924");
function draw() {
  requestAnimationFrame(draw);

  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    // ctx.strokeStyle = "#fcb040";
    ctx.lineWidth = '1';
    if(outerLineY <h && outerLineX<w)
    {
      ctx.beginPath();
      ctx.moveTo(w, 0);
      ctx.strokeStyle = color2;
      outerLineY+=deltaPathBorder;
      ctx.lineTo(w, outerLineY);//первая линия
      if (outerLineY+deltaPathBorder>h)
      {
        ctx.lineTo(w, h);
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(2.5, h-3);
      ctx.strokeStyle = color4;
      if (h-outerLineY-3>15)
        ctx.lineTo(2.5, h-outerLineY-3)
      else
        ctx.lineTo(2.5, 2.5);
    }
    if (outerLineY >h && outerLineX<w)
      {
        ctx.beginPath();
        ctx.moveTo(w, h);
        ctx.strokeStyle = color3;
        outerLineX+=deltaPathBorder;
        ctx.lineTo(w-outerLineX, h);//вторая линия
        if (outerLineX+deltaPathBorder>w)
        {
            ctx.lineTo(0, h);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(3.5, 2.5);
        ctx.strokeStyle = color1;
        if (w-outerLineX>15)
          ctx.lineTo(3+outerLineX,2.5)
        else
          ctx.lineTo(w-3+0.5,2.5);
      }
    if (outerLineYY <h && outerLineX>w)
      {
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.strokeStyle = color4;
        outerLineYY+=deltaPathBorder;
        ctx.lineTo(0, h-outerLineYY);//третья линия
        if (outerLineYY+deltaPathBorder>h)
        {
            ctx.lineTo(0, 0);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = color2;
        ctx.moveTo(w-3+0.5, 3);
// 
          if (h-outerLineYY>15)
            ctx.lineTo(w-3+0.5,3+outerLineYY);
        else
          ctx.lineTo(w-3+0.5,h-3);
      }
    if (outerLineYY >h && outerLineXX<w)
      {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.strokeStyle = color1;
        outerLineXX+=deltaPathBorder;
        ctx.lineTo(0+outerLineXX, 0);//четвертая линия
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = color2;
        ctx.moveTo(w-3+0.5, h-3+0.5);
        if (w-outerLineXX>15)
            ctx.lineTo(w-3+0.5-outerLineXX,h-3+0.5);
        else
            ctx.lineTo(2.5,h-3+0.5);
        ctx.stroke();
      }
    ctx.stroke();
    then = now - (delta % interval);
  }
}
document.addEventListener("DOMContentLoaded", function() {
  draw();
});
// }