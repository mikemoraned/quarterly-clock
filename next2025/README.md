# Next 2025

This dir is related to the `next2025` branch and the purpose of both is to hold in-dev next version of Quarterly Clock. We'll keep this around until all the TODO's are done below, at which point it will become the top-level new version.

## High-level summary

Visible:
* Switch to a display based on quarters/months/days. The original version was based on weeks but that was on the naive assumption that quarters were multiples of weeks, when they are actually based on months. Week starts don't neatly align.
* Allow holidays, weekends and other non-working days to be cleanly handled and visualised.

Behind-the-scenes:
* Accommodate variations in when quarters start in the simplest as possible way i.e. allow us to simply state that a quarter starts in a particular month and everything just works.
* Defining the bulk of the SVG dom structure in Solid JSX but with things like arc paths still using D3
* Make everything be typed in Typescript
* Have a centrally defined and easy-to-understand model

## TODOs

* [x] Set up basic Solid SVG app rendering in a branch via netlify
    * [x] rendering in a branch via netlify
    * [x] Basic Solid App showing some SVG
* [x] Make Guides hide / show based on double-clicking or double-tapping in main area
* [x] Visualise months
    * [x] Show months as an arc
    * [x] Show month names on the border of the clock
* [ ] port across main components:
    * [ ] Logo
    * [ ] current quarter
        * [ ] label
        * [ ] visualisation
    * [ ] quarter background in center
    * [ ] Remaining time 
        * [ ] label
            * will probably replace this with remaining days
        * [ ] visualisation
            * this should be made generic-enough to support display any available days
    * [ ] current Day hand
* [ ] support yearStartMonth cleanly
    * [x] add support in model for starting a month sequence that isn't start of year
    * [ ] parse from URL
* [ ] ...