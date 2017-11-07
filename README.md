# IssueReward

## How to compile and run example

### Init webpack

sh init-webpack.sh

### Start local blockchain
testrpc -m "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15"

### Start node app
npm run dev

### Install metamask and use with testrpc
http://truffleframework.com/docs/advanced/truffle-with-metamask

Import user account using private keys (at least first 2) print on testerpc startup. Using testrpc with "-m" parameter above they will be:

**Available Accounts**

(0) 0x227f2c0391c7c80a3a8aeedfd1f34b446b4effdc

(1) 0xfce71a30d5f5335594924e413a49fe547ec62c09

(2) 0xf90f1c8817bfc25d00c55168b01af6e12bd23667

(3) 0x3d771f46e53c755891e6337358472a93a035bacf

(4) 0x99c7809a336d8881c50d295eaf2afae7052df490

(5) 0x3c34ce1cac2dad21185f363a64682da4f6193374

(6) 0x963951f7221252b1e36cc6a5791d6cdd643f2e20

(7) 0x6ba6f855d09c4de196e540ba3d7266cfa89b2477

(8) 0x57441b5966ed7230d39c71304fb795957f180f2a

(9) 0xcdab925314f22dc5a9f82db911d67a11cf484f13

**Private Keys**

(0) bfa25c0dc6b107759d23a921466413eefff2397e3645600574d4bad10f385875

(1) 0ceb309a39a035ef3b449710fb396ffde27fc15f899cb9587e76f939258c4a0c

(2) 3f5186d719e24559b72ee30602e1277fe4d4f49e3e948de3984cb6f8d2e45ed6

(3) d73d4724a15d783dc1c7a77de7ee61c8394fb8771bc08730acf925a36ea190df

(4) 7a3e67ff5762ecf1bf83c62835745362bbdc33fdb3cf7bb66dca4768fc33c3c5

(5) b2823ad63f5165e99f966bd2120be856e6823bd4fe07e0b91da0fb652a57c632

(6) b95b4aa7f7a72c9cc7e873452adfe8bb389d7a8e7f4cf0c675b2861c7f7adb7a

(7) c756c4b4630820e2c0177654972291062773de67def5e1b5faee528f4b9c4286

(8) b7695d363dad18efff5671926224480c16efaaffc6554ae2e4ae53e710f647b6

(9) 4f1ae6078dad6fa989c8cd2a541169828c84d0fe536b4de886a853ad024dc5ff


### Open localhost and play
http://localhost:8080/

### Explore blockchain blocks with EthExplorer

git clone https://github.com/etherparty/explorer

npm start

Then visit http://localhost:8000

