# Technical Debt

[![Build Status](https://travis-ci.org/ministryofjustice/clarity-prototype-kit.svg?branch=master)](https://travis-ci.org/ministryofjustice/clarity-prototype-kit)
[![Dependency Status](https://gemnasium.com/ministryofjustice/clarity-prototype-kit.svg)](https://gemnasium.com/ministryofjustice/clarity-prototype-kit)

## Tasks

1. In order to get this out quickly. I've not taken advantage of context switching which means some components are not reusable or are tied to a particular page. As it's only an issue in the prototype it's not a priority to fix but ideally all components should use context.value instead of (for example) poll.value, this way the context can be specified at page level.
2. Add data-legacy-remove="ie7" information to the coding guidelines
## Issues
1. It seems I can't fix the rewriter function in a way that works in IE7. As it's only needed for the prototype I'm going to just remove it and replace it with a page reload version.