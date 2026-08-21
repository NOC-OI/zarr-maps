import { ContextHandleProvider } from '../application/context-handle';
import { MapOL } from '../components/map-ol';
import { SideBar } from '../components/side-bar';
import { FlashMessages } from '../components/ui/flash-messages';
import { Loading } from '../components/ui/loading';

export function OLDemo() {
  return (
    <ContextHandleProvider>
      <SideBar />
      <MapOL />
      <FlashMessages width="medium" duration={3000} position="tright" />
      <Loading />
    </ContextHandleProvider>
  );
}

export default OLDemo;
