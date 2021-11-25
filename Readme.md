# Emotiv SDK

Implementation of the [EMOTIV Cortex API](https://emotiv.gitbook.io/cortex-api/). 

Currently setup to automate flow for mental command reading.

## Feature set

Functionality is mostly read only.

### Basic

* [x] Auth flow
* [x] Headset connection
* [x] Profiles

### Streams

* [ ] Raw EEG
* [ ] Motion data
* [ ] Device data
* [ ] EEG quality
* [ ] Band power
* [ ] Performance metrics
* [x] Mental commands
* [ ] Facial expression
* [ ] System events

## Usage

`npm install emotiv-sdk` or `yarn add emotiv-sdk`

Refer to [the example](./example/example.ts) and [the typings](./src/types/api.ts) for a brief usage rundown.

### Current semi-automated flow

* run `const api = initializeEmotivApi(initData)`
  * setup callbacks for at least `setHeadsets` and `setProfiles` to continue flow
* run `api.connect()`
* automatic flow starts
  * gets user login
  * requests access for application
* accept your application in the EMOTIV app (only once per machine)
* automatic flow continues
  * authorizes without license (license only needed for raw eeg data)
  * queries headsets
* run `api.connectHeadset(headset.id)` for one of the headsets returned
* automatic flow continues
  * creates session for headset
  * queries profiles
* run `api.loadProfile(profile.name)` for one the profiles returned
* automatic flow continues
  * retrieves current active mental commands
  * subscribes to `com` data stream to retrieve mental commands

### Additional info
* if using in a Node.js environment set `process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0` to allow connection to self signed web socket of EMOTIV
