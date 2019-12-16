
import { Theme, createStyles } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import { MAPGL_TOKEN } from '../config/keys'
import * as React from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { useEffect } from 'react';


const styles = (theme: Theme) => createStyles({
})
interface Props extends WithStyles<typeof styles> {
    classes: any,

}

const TabMap: React.FC<Props> = ({ classes }) => {
    // const TabMap: React.FC<Props> = extends React.Component<{}, StaTabMapte> {
    // public state: State = initialState;

    // type State = typeof initialState;
    type Viewport = typeof initialState.viewport;
    const initialState = {
        viewport: {
            height: 400,
            latitude: 37.776021,
            longitude: -122.4171949,
            width: 400,
            zoom: 14,
        },
    };
    const [viewport, setViewport] = React.useState<Viewport>(initialState.viewport)

    useEffect(() => {
        resize()
    }, [window]);
    // const componentDidMount() {
    //         window.addEventListener('resize', this.resize);
    //         this.resize();
    //     }
    // window.addEventListenwindow.addEventListener('resize', this.resize);
    //         this.resize();er('resize', this.resize);
    //         this.resize();
    // const componentWillUnmount() {
    //         window.removeEventListener('resize', this.resize);
    //     }

    // const updateViewport = (viewport: Viewport) => {
    //     setViewport(prevState => ({
    //         viewport: { ...prevState.viewport, ...viewport },
    //     }));
    // };

    const resize = () => {
        const resViewport = {
            ...viewport,
            height: window.innerHeight,
            width: window.innerWidth,
        }
        setViewport(resViewport);
    };



    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={MAPGL_TOKEN}
            onViewportChange={(v: Viewport) => setViewport(v)}
        >
            <div style={{ position: 'absolute', right: 30, bottom: 30 }}>
                <NavigationControl
                    onViewportChange={(v: Viewport) => setViewport(v)} />
            </div>
        </ReactMapGL>
    );

}
export default withStyles(styles)(TabMap)