/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

//load site-wide styles
import './src/styles/index.scss'

import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: 'b20a6399-ffd0-467d-83ac-4268d1c9daba',
    clientToken: 'pubf80f3ffd23e3eaa90b9261a5077b5d8a',
    datacenter: Datacenter.US,
    sampleRate: 100,
    trackInteractions: true
});
