<template>
   
        <div class="article-card">
            <div class="top-section">
                <div class="author-image-container">
                    <div class="image_container" :style="{ backgroundColor: randomColor }" @mouseover="isHovered = true" @mouseleave="isHovered = false">
                        <!-- Profile image placeholder -->
                    </div>
                    <div class="reading-time-badge" :class="{ active: isHovered }">
                        <span class="time-value">{{ time }} mins </span>
                        <span class="time-label">read</span>
                    </div>
                </div>
                <div class="blog-meta">
                    <span class="author">{{ author }}</span>
                    <span class="date">{{ date }}</span>
                </div>
            </div>

            <div class="content_container">
                <div class="description-container">
                    {{ description }}
                </div>
            </div>
        </div>
  
</template>

<script>
import truncate from "@/helpers/truncateText.js";
//import { stringToRawPath } from "gsap/utils/paths.js";

import { BASE_URL } from "@/constants/constants.js";
import avatarblog from "@/assets/user.png";
const colors = [
    "#b1c4d6", // Air (lighter than your #e2e8f0)
];
export default {
    name: "CardBlog",
    props: ["image", "title", "time", "description", "text", "date", "category", "author", "id"],

    data() {
        return {
            isHovered: false,
            randomColor: colors[Math.floor(Math.random() * colors.length)],
        };
    },
    computed: {
        preview() {
            return truncate(this.text, 10);
        },
    },
    methods: {
        getImgUrl(imgFileId) {
            if (imgFileId) {
                var image = `${BASE_URL}/articles/image/${imgFileId}`;
                return image;
            }
            return avatarblog;
        },
    },
};
</script>

<style lang="scss" scoped>
body{  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      }
.article-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 60%;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    .top-section {
        display: flex;
        gap: 15px;
        padding: 30px 30px 0px 60px;
        position: relative;
    }

    .author-image-container {
        position: relative;
        display: inline-block;
    }

    .image_container {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
    }

    .reading-time-badge {
        position: absolute;
        color: #1e1e1e;
        
        font-family: Roboto;
        font-weight: 500;
        border-radius: 4px;
        z-index: 10;
        opacity: 0;
        white-space: nowrap;
        min-width: 80px;
        text-align: start;
        pointer-events: none;
        top: -20px;
        right: 20px;

        // Initial state (hidden and scaled down)
        transform: scale(0.5);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); // Bouncy ease-out

        &.active {
            opacity: 1;
            transform: scale(1);

            // Disappear animation when inactive
            transition:
                opacity 0.2s ease-in,
                transform 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045); // Fast shrink with overshoot
        }

        .time-value {
            font-size: 15px;
            line-height: 1.6;

            color: #4a4a4a;
        }

        .time-label {
            display: block;
            font-size: 13px;
            color: #7d7d7d;
          font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
    }

    .blog-meta {
        display: flex;
        flex-direction: column;
        justify-content: start;
        color: #7d7d7d;
        font-size: 15px;
        font-weight: 400;
        line-height: 1.4;
        text-align: start;
        margin: 15px;
      font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .author {
        font-weight: 700;
        color: #4a4a4a;
        text-align: start;
    }

    .content_container {
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .description-container {
        margin-top: 30px;
        margin-left: 30px;
         margin-right: 30px;
         font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    @media (max-width: 768px) {
        min-height: 380px;
        height: 30%;

        .image_container {
            width: 50px;
            height: 50px;
        }

        .reading-time-badge {
            font-size: 11px;
            padding: 4px 8px;
            top: -30px;

            &.active {
                top: -35px;
            }
        }
    }
}
a{text-decoration: none;}
</style>
