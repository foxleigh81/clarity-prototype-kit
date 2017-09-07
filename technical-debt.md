# Technical Debt

[![Build Status](https://travis-ci.org/ministryofjustice/clarity-prototype-kit.svg?branch=master)](https://travis-ci.org/ministryofjustice/clarity-prototype-kit)
[![Dependency Status](https://gemnasium.com/ministryofjustice/clarity-prototype-kit.svg)](https://gemnasium.com/ministryofjustice/clarity-prototype-kit)

Any development tasks or optimisations which need to be made should be listed here.

**Note:** If there is a task/bug manager in place to cover this then this file will not be updated.

## Tasks:

1. The "white box with 1rem padding style has become common throughout the site, it makes sense to make it a mixin and utility class and apply it throughout"
2. It would make sense at this stage to alter the way the data is imported. Rather than being 'one model per page plus one global model' it should be 'one model per page plus a global plus an agency'. Or perhaps at least make it so a page model can chose which page it is associated to rather than it automatically matching the json `<filename class=""></filename>`

## Issues
