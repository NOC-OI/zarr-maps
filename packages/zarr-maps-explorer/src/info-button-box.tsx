import type { Dispatch, SetStateAction } from 'react';
import { InfoPanel } from './info-panel';
import type { ExplorerInfoBox } from './types';

interface InfoButtonBoxProps<T extends ExplorerInfoBox> {
  infoButtonBox: T;
  setInfoButtonBox: Dispatch<SetStateAction<T>>;
  emptyValue: T;
}

export function InfoButtonBox<T extends ExplorerInfoBox>({
  infoButtonBox,
  setInfoButtonBox,
  emptyValue
}: InfoButtonBoxProps<T>) {
  function handleClose() {
    infoButtonBox.onClose?.();
    setInfoButtonBox(emptyValue);
  }

  return (
    <InfoPanel title={infoButtonBox.title} onClose={handleClose}>
      {infoButtonBox.content}
    </InfoPanel>
  );
}
