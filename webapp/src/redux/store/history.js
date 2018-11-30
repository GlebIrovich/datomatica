import { createBrowserHistory } from 'history';
import configs from '../../configs';

const history = createBrowserHistory({ basename: configs.basename });

export default history;
