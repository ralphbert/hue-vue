import Firebase from '../../../../node_modules/firebase/app';
import Auth from '../../../../node_modules/firebase/auth';
import Config from '../../../firebase-config';

export default Firebase.initializeApp(Config)