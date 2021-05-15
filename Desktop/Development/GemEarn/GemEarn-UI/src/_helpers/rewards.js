export const Rewards = [
  {
    name: 'Robux',
    image: require('@/assets/images/rewards/robux.png'),
    provider: 'robux',
    stock: true,
    modal: {
      name: 'Roblox',
      ul: [
        'Enter your Roblox username',
        'Enter the amount of Robux you want to receive (1 Robux = 1 Point)',
        'Join the group that will be shown to you',
        'When you are in the group, click ‘Claim Robux’ and you will receive your Robux within 5 minutes',
      ],
    }
  },
  {
    name: 'Bitcoin',
    image: require('@/assets/images/rewards/bitcoin.png'),
    provider: 'bitcoin',
    stock: true,
    modal: {
      name: 'Bitcoin',
    },
    options: [
      {
        country: null,
        value: 10,
      },
      {
        country: null,
        value: 15,
      },
      {
        country: null,
        value: 20,
      },
    ],
  },
  {
    name: 'App Store',
    image: require('@/assets/images/rewards/apple.png'),
    provider: 'apple',
    stock: true,
    modal: {
      name: 'Apple',
      redeemAlert: 'All App Store Gift Cards can be redeemed on the App Store.',
      ul: [
        'On your iPhone, iPad, or iPod touch, open the App Store app.',
        'At the top of the screen, tap the sign-in button or your photo.',
        'Tap "Redeem Gift Card or Code." If you don’t see “Redeem Gift Card or Code,” sign in with your Apple ID.',
        'Enter your code manually.',
        'Tap Redeem in the top right corner.',
      ],
    }
  },
  {
    name: 'Xbox',
    image: require('@/assets/images/rewards/xbox.png'),
    provider: 'xbox',
    stock: true,
    modal: {
      name: 'Xbox',
      redeemAlert: 'All XBOX Gift Cards can be redeemed on the XBOX website.',
      text: 'You can redeem XBOX Gift Card codes internationally as long as you change your XBOX account region to <strong>match the correct country</strong>.',
    }
  },
  {
    name: 'Roblox',
    image: require('@/assets/images/rewards/roblox.png'),
    provider: 'roblox',
    stock: true,
    modal: {
      name: 'Roblox',
      redeemAlert: 'All ROBLOX Gift Cards can be redeemed on the ROBLOX website.',
      ul: [
        'Navigate to <a class="tw-text-primary" href="https://roblox.com/gamecards/redeem" target="_blank">roblox.com/gamecards/redeem</a> from a web browser.',
        'Enter your code in the \'Enter Pin Code\' section.',
        'Tap Redeem.',
        'Then hit Redeem to add the balance to your ROBLOX account.',
      ],
    }
  },
  {
    name: 'PSN',
    image: require('@/assets/images/rewards/psn.png'),
    provider: 'psn',
    stock: true,
    modal: {
      name: 'PlayStation',
      redeemAlert: 'All PlayStation Gift Cards can be redeemed on the PlayStation website.',
      text: 'You can only redeem PlayStation Gift Card codes in the account’s region so <strong>make sure to select the correct country</strong>',
    }
  },
  {
    name: 'Google Play',
    image: require('@/assets/images/rewards/googleplay.png'),
    provider: 'google_play',
    stock: true,
    modal: {
      name: 'Google Play',
      redeemAlert: 'All Google Play Gift Cards can be redeemed on the Google website.',
      ul: [
        'Navigate to <a class="tw-text-primary" href="https://play.google.com/redeem" target="_blank">play.google.com/redeem</a> from a web browser.',
        'Click on Redeem near the bottom left corner (or just go to <a class="tw-text-primary" href="https://play.google.com/redeem" target="_blank">play.google.com/redeem</a>).',
        'Enter your 16-digit code in the popup.',
        'Tap Redeem.',
        'Then hit Confirm to add the balance to your Google account.',
      ],
    }
  },
  {
    name: 'Netflix',
    image: require('@/assets/images/rewards/netflix.png'),
    provider: 'netflix',
    stock: true,
    modal: {
      name: 'Netflix',
      redeemAlert: 'All Netflix Gift Cards can be redeemed on the Netflix website.',
      text: 'You can only redeem Netflix Gift Cards on an account that uses the same currency. <br>' +
          'For example: £ Gift Cards can be used in the United Kingdom but not in the United States. <br>' +
          '$ Gift Cards can be used in the United States but not in the United Kingdom.',
    }
  },
  {
    name: 'Spotify',
    image: require('@/assets/images/rewards/spotify.png'),
    provider: 'spotify',
    stock: true,
    modal: {
      name: 'Spotify',
      redeemAlert: 'Spotify Gift Cards can only be redeemed on Spotify accounts registered in the <strong>same country</strong> where they were purchased.',
      ul: [
        'Go to <a class="tw-text-primary" href="https://spotify.com/redeem" target="_blank">spotify.com/redeem</a>.',
        'Login to Spotify.',
        'Enter the code and click Redeem.',
      ],
    }
  },
  {
    name: 'Discord Nitro',
    image: require('@/assets/images/rewards/discord.png'),
    provider: 'discord',
    stock: true,
    modal: {
      name: 'Discord',
      ul: [
        'Navigate to <a class="tw-text-primary" href="https://discord.com/app" target="_blank">discord.com/app</a> and open your user settings.',
        'Click on ‘Gift Inventory’',
        'Enter your code in the \'Redeem Codes\' section.',
        'Tap Redeem.',
      ],
    }
  },
  {
    name: 'Steam',
    image: require('@/assets/images/rewards/steam.png'),
    provider: 'steam',
    stock: true,
    modal: {
      name: 'Steam',
      ul: [
        'Navigate to <a class="tw-text-primary" href="https://discord.com/app" target="_blank">discord.com/app</a> and open your user settings.',
        'Click on ‘Gift Inventory’',
        'Enter your code in the \'Redeem Codes\' section.',
        'Tap Redeem.',
      ],
    }
  },
  {
    name: 'Fortnite',
    image: require('@/assets/images/rewards/fortnite.png'),
    provider: 'fortnite',
    stock: true,
    modal: {
      name: 'Fortnite',
      ul: [
        'Navigate to <a class="tw-text-primary" href="https://discord.com/app" target="_blank">discord.com/app</a> and open your user settings.',
        'Click on ‘Gift Inventory’',
        'Enter your code in the \'Redeem Codes\' section.',
        'Tap Redeem.',
      ],
    }
  },
  {
    name: 'Valorant',
    image: require('@/assets/images/rewards/valorant.png'),
    provider: 'valorant',
    stock: true,
    modal: {
      name: 'Valorant',
      ul: [
        'Navigate to <a class="tw-text-primary" href="https://discord.com/app" target="_blank">discord.com/app</a> and open your user settings.',
        'Click on ‘Gift Inventory’',
        'Enter your code in the \'Redeem Codes\' section.',
        'Tap Redeem.',
      ],
    }
  },
];
