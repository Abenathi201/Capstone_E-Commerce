<template>
    <div class="contact">
    
        <div class="form">
            <h1>CONTACT US</h1>
            <p> 
                Do you want to get started with your shopping and you need <br>
                 my help? Feel free to contact me. 
            </p>

            <div class="upper">
                <input type="text" name="name" class="name" placeholder="Your Name...">
                <input type="email" name="email" class="email" placeholder="example@gmail.com">
            </div>

            <div class="lower">
                <input type="text" name="hello" class="hello" placeholder="Hello!">
                <input type="textarea" name="subject" class="subject" placeholder="Subject">
            </div>
            <button>
                Send Message
            </button>
        </div>

        <!-- <div class="subscribe">
            <h1>Subscribe to our Newsletter</h1>
            <p>Subscribe and get the latest merchendise and autographed in the wrestling industry.</p>
    
            <input type="email" name="email" placeholder="Enter email">
            <button>BTN</button>
        </div> -->

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1002.38505598544!2d-87.67850945340822!3d41.91125669421786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd2c0a59ffa35%3A0xe07825d256ce4d4e!2sDiptyque%20Chicago!5e0!3m2!1sen!2sza!4v1694696902926!5m2!1sen!2sza" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.contact{
    margin-top: 200px;
}

.form{
    width: 866px;
    height: 507px;
    box-shadow: 0px 0px 56px rgba(0, 38, 3, 0.08);
    margin: auto;
    padding: 15px;
}

.form h1{
    font-size: 24px;
    font-weight: bold;
    text-align: center;
}

.form p{
    font-size: 14px;
    color: #808080;
    text-align: center;
    margin-top: 20px;
}

.upper{
    display: flex;
    gap: 14px;
    margin-block: 20px;
}

.lower{
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.upper .name, .upper .email{
    width: 382px;
    height: 49px;
    border: 2px solid #E6E6E6;
    padding-left: 5px;
}

.lower .hello{
    width: 778px;
    height: 49px;    
    border: 2px solid #E6E6E6;
    padding-left: 5px;
}
.lower .subject{
    width: 778px;
    height: 98px;
    border: 2px solid #E6E6E6;
    padding-left: 5px;
}

.form button{
    width: 175px;
    height: 51px;
    background-color: #000000;
    color: #FFFFFF;
    font-size: 16px;
    border: none;
    font-weight: 600;
    margin-top: 30px;
    cursor: pointer;
}

iframe{
    margin-top: 45px;
    width: 100%;
}
</style>