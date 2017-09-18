# Technical Debt

[![Build Status](https://travis-ci.org/ministryofjustice/clarity-prototype-kit.svg?branch=master)](https://travis-ci.org/ministryofjustice/clarity-prototype-kit)
[![Dependency Status](https://gemnasium.com/ministryofjustice/clarity-prototype-kit.svg)](https://gemnasium.com/ministryofjustice/clarity-prototype-kit)

Any development tasks or optimisations which need to be made should be listed here.

**Note:** If there is a task/bug manager in place to cover this then this file will not be updated.

## Tasks

1. The "white box with 1rem padding style has become common throughout the site, it makes sense to make it a mixin and utility class and apply it throughout"
2. In order to get this out quickly. I've not taken advantage of context switching which means some components are not reusable or are tied to a particular page. As it's only an issue in the prototype it's not a priority to fix but ideally all components should use context.value instead of (for example) poll.value, this way the context can be specified at page level.
## Issues
