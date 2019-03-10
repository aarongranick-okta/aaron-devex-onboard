/* global document */
export default function createSocketClient(config) {
  const clientScriptUrl = `${config.msgSvc.clientScriptUrl}`;

  // Inject client script to connect to streaming resources
  const script = document.createElement('script');
  script.src = clientScriptUrl;
  document.head.appendChild(script);

  script.onload = () => {
    console.log('primus loaded');
  };
}
