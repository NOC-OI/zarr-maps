import { ContextHandleProvider } from '../application/context-handle';
import { LayersManagementHandleProvider } from '../application/layers-management';
import { MapOL } from '../components/map-ol';
import { SideBar } from '../components/side-bar';
import { FlashMessages } from '../components/ui/flash-messages';
import { Loading } from '../components/ui/loading';

export function OLDemo() {
  return (
    <ContextHandleProvider>
      <LayersManagementHandleProvider>
        <SideBar />
        <MapOL />
        <FlashMessages width="medium" duration={3000} position="tright" />
        <Loading />
      </LayersManagementHandleProvider>
    </ContextHandleProvider>
  );
}

export default OLDemo;
