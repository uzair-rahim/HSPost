<!-- Employer Logo -->
<div class="column employer-logo">
	{{#if_not_null employer.logo}}
		<img src="{{employer.logo.url}}"/>
	{{/if_not_null}}
</div>
<!-- Employer Info -->
<div class="column employer-info">
	<div class="name">{{employer.name}}</div>
	<div class="location">
		{{#if_not_null employer.location}}
			{{employer.location.address1}}
		{{else}}
			Location not available
		{{/if_not_null}}
	</div>
</div>
<!-- More -->
<div class="column more"></div>