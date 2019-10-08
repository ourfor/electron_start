import {CopyRight} from './copyright.jsx';
import './styles/index.scss';


class Index extends Component {

    render = () => {
        return (
            <div className="main-container">
                <header></header>
                <div id="main-content"></div>
                <footer><CopyRight /></footer>
            </div>
        );
    }
}

ReactDOM.render(<Index />,document.getElementById('container'));