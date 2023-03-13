export default function typewriter(text, setTarget, timePerChar=20) {
   /**
    * Type text into a target state character by character, using typewriter effect.
    * @param {string} text Text to type into the target state.
    * @param {function} setTarget Target state setter (should set a string variable state).
    * @param {integer} timePerChar Time (in ms) it takes to type a character (20ms if unspecified).
    */

    let i = 0;

    let timer=setInterval(function(){
      if(i<text.length){
        setTarget((prevTarget) => (prevTarget + text.charAt(i)));
        i++;
      }else{
        clearInterval(timer);
      }
    }, timePerChar)
}