import AnywayImage from '../assets/anyway.png';
import OrYarokLogo from '../assets/Or_Yarok.png';


const orYarok = 'אור ירוק'
const none = null;
export const anywayLogo = AnywayImage;

const logoMap  : Map<string | null,string>  = new Map();
logoMap.set(orYarok,OrYarokLogo);
logoMap.set(none,AnywayImage);
logoMap.set(none,AnywayImage);

export default logoMap;
