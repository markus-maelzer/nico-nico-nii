const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const Request = require('request');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidKey = 'BCAeciJqtkJQXDIFQlgcJa13UE17xfKLMmCVuSZP46nO7E8ly1W-Iio-JsuJQGoY_jpfPD-F7hqvK0k-RH99cVk';
const privateVapidKey = 'ubY7pIpbwAZa2HMpt6ngKfYRSFc3ssg5Nx_nssT4p9s';

webpush.setVapidDetails('mailto:test@test.at', publicVapidKey, privateVapidKey);

//Subscribe Route
app.post('http://127.0.0.1/Tests/wep-push-integration/api/collections/save/web_push_subscriptions?token=212d571438087c353dd9d3dabee2e8', (req, res) => {
  if(!req.body || !req.body.endpoint) {
    res.status(400);
    res.setHeader('Content-Tpye', 'application/json');
  }
});

app.post('/webhookdata', (req, res) => {
  Request.get('http://127.0.0.1/Tests/wep-push-integration/api/collections/get/web_push_subscriptions?token=212d571438087c353dd9d3dabee2e8', (error, response, body) => {
    if(error) {
      return console.dir(error);
    }
    var subscriptions = JSON.parse(body);
    console.log(subscriptions);
    let promiseChain = Promise.resolve();

    for (let i = 0; i < subscriptions.entries.length; i++) {
      const subscription = subscriptions.entries[i].subscription;
      console.log(req.body.args[1]);
      promiseChain = promiseChain.then(() => {
        return triggerPushMsg(subscription, req.body.args[1]);
      });
    }
    return promiseChain;
  })
})
const triggerPushMsg = function(subscription, dataToSend) {
  console.log(subscription);
  return webpush.sendNotification(subscription, dataToSend)

  .catch((err) => {
    if (err.statusCode === 404 || err.statusCode === 410) {
      console.log('Subscription has expired or is no longer valid: ', err);
      return deleteSubscriptionFromDatabase(subscription._id);
    } else {
      throw err;
    }
  });
};
app.post('/webhookdata', (req, res) => {
  console.log(req.body);
})

const port = 3030;

app.listen(port, () => console.log(Server starded on port ${port}));




const publicVapidKey = 'BCAeciJqtkJQXDIFQlgcJa13UE17xfKLMmCVuSZP46nO7E8ly1W-Iio-JsuJQGoY_jpfPD-F7hqvK0k-RH99cVk';

// check for service worker
if('serviceWorker' in navigator) {
  if(Notification.permission === 'granted') {
    console.log('already granted');
  } else {
    subscribeUser();
  }
}

async function subscribeUser() {
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: '/'
  });

  const askPermission = await Notification.requestPermission(result => {
    if(result !== 'granted') {
      throw new Error('We werent/t granted permission to send you notifications');
    }
    return result
  });

  if(askPermission === 'granted') {
    const subscribeUserToPush = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    await fetch('http://127.0.0.1/Tests/wep-push-integration/api/collections/save/web_push_subscriptions?token=212d571438087c353dd9d3dabee2e8', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: { subscription: subscribeUserToPush},
      })
    })
  }
}


self.addEventListener('push', e => {
  const data = e.data;
  console.log(data);
  console.log('Push recieved...');
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: 'http://image.ibb.co/frY0Fd/tmlogo.png'
  })
});
