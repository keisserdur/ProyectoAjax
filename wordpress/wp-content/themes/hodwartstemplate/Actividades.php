<?php
/**
 *     Template Name: Actividades 
 */
  get_header();
  ?>
  <div class="default">
  <?php
  get_template_part('template-part/nav');
 ?>
 </div>
 
 <div class="activities-header">
     <img src="<?php echo get_template_directory_uri() ?>/img/foto-4.jpg"></img>
     <h1>News Activities</h1>
 </div>
 
 <section class="activities-page">
     <div class="activities-internal-wrapper">
         <div class="activities-show">
             Show number 
             <select id="shownumber">
               <option>1</option>
               <option>3</option>
               <option>5</option>
               <option>10</option>
               <option>25</option>
               <option>50</option>
               </select>
         </div>
       <div id="activities-content">
         
       </div>
       
       <div id="activities-sidebar">
         
       </div>
   </div>
 </section>
 


<script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/js/wpajaxrequest.js"></script>
<!-- Esto es lo que tienes que poner en donde queires que salga el footer <div class="front-page">-->
<div class="front-page"></div>
<?php get_footer(); ?>