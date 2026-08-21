import { ContextHandleProvider } from '../application/context-handle';
import { MapLeaflet } from '../components/map-leaflet';
import { SideBar } from '../components/side-bar';
import { FlashMessages } from '../components/ui/flash-messages';
import { Loading } from '../components/ui/loading';

export function LeafletDemo() {
  return (
    <ContextHandleProvider>
      <SideBar />
      <MapLeaflet />
      <FlashMessages width="medium" duration={3000} position="tright" />
      <Loading />
    </ContextHandleProvider>
  );
}

export default LeafletDemo;
