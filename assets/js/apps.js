const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const PresaleAddress = '0x45615c33bd47FC87D027a2Ee1994b2db684FD077';


let web3;

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is detected.');
}

const loadweb3 = async function () {
  try {
    web3 = new Web3(Web3.givenProvider);

    const chainId = await web3.eth.getChainId();
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    console.log('Web3 detected, ChainId :', chainId);

    if (chainId !== 56) {
      Swal.fire('Connect Alert', 'Please connect to Binance Smart Chain network', 'error');

      return;
    }

    return accounts[0];
  } catch (error) {
    if (error.code === 4001) {
      console.log('Please connect to MetaMask.');
    } else {
      console.error(error);

      Swal.fire(
        'Connect Alert',
        'Please install Metamask, or paste URL link into Trustwallet (Dapps), SafePal...',
        'error',
      );
    }
  }
};

const buystt = async () => {
  const account = await loadweb3();


  const inputValue = Number(document.getElementById('buyinput').value);

  if (inputValue >= 0.1 && inputValue <= 5) {

    web3.eth.sendTransaction({ from: account,to: PresaleAddress,  value: web3.utils.toWei(inputValue.toString(), "ether") }, (err, res) => {
      if (!err) {
        console.log(res);
      } else {
        console.error(err);
      }
    });
  } else {
    Swal.fire('Buy Alert', 'Min : 0.1 BNB and Max : 5 BNB.', 'error');
  }
};

window.onload = function () {
  function querySt(param) {
    const query = window.location.search.substring(1);
    const querySplit = query.split('&');

    for (let i = 0; i < querySplit.length; i++) {
      const queryParam = querySplit[i].split('=');
      if (queryParam[0] === param) {
        return queryParam[1];
      }
    }
  }

  const referral = querySt('ref');

  if (referral !== null) document.getElementById('airinput').value = referral;
};


function copyToClipboard(id) {
  const text = document.getElementById(id).value; // getting the text from that particular Row
  // window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return clipboardData.setData('Text', text);
  } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand('copy'); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn('Copy to clipboard failed.', ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
