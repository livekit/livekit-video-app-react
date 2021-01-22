import { LocalTrackPublication, RemoteTrackPublication } from 'livekit-client';

type PublicationType = LocalTrackPublication | RemoteTrackPublication;

export default function usePublicationIsTrackEnabled(publication?: PublicationType) {
  // const [isEnabled, setIsEnabled] = useState(publication ? publication.isTrackEnabled : false);

  // useEffect(() => {
  //   setIsEnabled(publication ? publication.isTrackEnabled : false);

  //   if (publication) {
  //     const setEnabled = () => setIsEnabled(true);
  //     const setDisabled = () => setIsEnabled(false);
  //     publication.on('trackEnabled', setEnabled);
  //     publication.on('trackDisabled', setDisabled);
  //     return () => {
  //       publication.off('trackEnabled', setEnabled);
  //       publication.off('trackDisabled', setDisabled);
  //     };
  //   }
  // }, [publication]);

  return true;
}
