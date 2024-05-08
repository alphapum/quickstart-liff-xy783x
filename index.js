// Import stylesheets
import './style.css';

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function main() {
  // Initialize LIFF app)
  await liff.init({ liffId: '2004799305-JQAbwzY1' });
  // Try a LIFF function
  switch (liff.getOS()) {
    case 'android':
      body.style.backgroundColor = '#d1f5d3';
      break;
    case 'ios':
      body.style.backgroundColor = '#eeeeee';
      break;
    default:
      body.style.backgroundColor = '#898989';
      break;
  }

  getEnvironment();
  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnLogIn.style.display = 'none';
      btnLogOut.style.display = 'block';
      getUserProfile();
      getEnvironment();
      btnShare.style.display = 'block';
      btnScanCode.style.display = 'block';
    } else {
      btnLogIn.style.display = 'block';
      btnLogOut.style.display = 'none';
    }
  } else {
    btnSend.style.display = 'block';
    getUserProfile();
    getEnvironment();
    btnShare.style.display = 'block';
    btnScanCode.style.display = 'block';
  }
}
function getEnvironment() {
  const language = document.getElementById('Language');
  const version = document.getElementById('Version');
  const isInClient = document.getElementById('isInClient');
  const isLoggedIn = document.getElementById('isLoggedIn');
  const os = document.getElementById('OS');
  const lineVersion = document.getElementById('LINEVersion');
  const isApiAvailable = document.getElementById('isApiAvailable');
  const contextType = document.getElementById('ContextType');
  language.innerHTML = '<b>Language:</b> ' + liff.getLanguage();
  version.innerHTML = '<b>Version:</b> ' + liff.getVersion();
  isInClient.innerHTML = '<b>isInClient:</b> ' + liff.isInClient();
  isLoggedIn.innerHTML = '<b>isLoggedIn:</b> ' + liff.isLoggedIn();
  os.innerHTML = '<b>OS:</b> ' + liff.getOS();
  lineVersion.innerHTML = '<b>LINE Version:</b> ' + liff.getLineVersion();
  contextType.innerHTML = '<b>Context Type:</b> ' + liff.getContext().type;
  isApiAvailable.innerHTML =
    '<b>Share Target Picker:</b> ' + liff.isApiAvailable('shareTargetPicker');
}
async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
  email.innerHTML = '<b>email:</b> ' + liff.getDecodedIDToken().email;
}

btnLogIn.onclick = () => {
  liff.login();
};

btnLogOut.onclick = () => {
  liff.logout();
  window.location.reload();
};

async function sendMsg() {
  if (
    liff.getContext().type !== 'none' &&
    liff.getContext().type !== 'external'
  ) {
    await liff.sendMessages([
      {
        type: 'text',
        text: 'This message was sent by sendMessages()',
      },
    ]);

    alert('Message sent');
  }
}

btnSend.onclick = () => {
  sendMsg();
};

async function shareMsg() {
  await liff.shareTargetPicker([
    {
      type: 'image',
      originalContentUrl:
        'https://drive.google.com/thumbnail?id=1XkTizDjtDssO9LdEJeQfx-XadEMTbZuf',
      previewImageUrl:
        'https://drive.google.com/thumbnail?id=1XkTizDjtDssO9LdEJeQfx-XadEMTbZuf',
    },
  ]);
}

btnShare.onclick = () => {
  shareMsg();
};

async function scanCode() {
  const result = await liff.scanCodeV2();
  code.innerHTML = '<b>Code: </b>' + result.value;
}

btnScanCode.onclick = () => {
  scanCode();
};
main();
