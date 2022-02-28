<template lang="html">
    <div class="row">
        <div class="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
            <div class="ps-block--average-rating">
                <div class="ps-block__header">
                    <h3>4.00</h3>
                    <rating />
                    <span>1 Review</span>
                </div>
                <div class="ps-block__star">
                    <span>5 Star</span>
                    <div class="ps-progress" data-value="100">
                        <span></span>
                    </div>
                    <span>100%</span>
                </div>
                <div class="ps-block__star">
                    <span>4 Star</span>
                    <div class="ps-progress" data-value="0">
                        <span></span>
                    </div>
                    <span>0</span>
                </div>
                <div class="ps-block__star">
                    <span>3 Star</span>
                    <div class="ps-progress" data-value="0">
                        <span></span>
                    </div>
                    <span>0</span>
                </div>
                <div class="ps-block__star">
                    <span>2 Star</span>
                    <div class="ps-progress" data-value="0">
                        <span></span>
                    </div>
                    <span>0</span>
                </div>
                <div class="ps-block__star">
                    <span>1 Star</span>
                    <div class="ps-progress" data-value="0">
                        <span></span>
                    </div>
                    <span>0</span>
                </div>
            </div>
        </div>
        <div class="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
            <form class="ps-form--review" action="/" method="get">
                <h4>Submit Your Review</h4>
                <p>
                    Your email address will not be published. Required fields
                    are marked
                    <sup>*</sup>
                </p>
                <div class="form-group form-group__rating">
                    <label>Your rating of this product</label>
                    <rating />
                </div>
                <div class="form-group">
                    <textarea
                        class="form-control"
                        rows="6"
                        placeholder="Write your review here"
                    ></textarea>
                </div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                        <div class="form-group">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Your Name"
                            />
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                        <div class="form-group">
                            <input
                                class="form-control"
                                type="email"
                                placeholder="Your Email"
                            />
                        </div>
                    </div>
                </div>
                <div class="form-group submit">
                    <button class="ps-btn">Submit Review</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Rating from '~/components/elements/commons/Rating';
export default {
    name: 'PartialReview',
    components: { Rating }
};
</script>

<style lang="scss" scoped></style>
