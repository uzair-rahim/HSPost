<div class="page-title">{{template.title}}</div>
<div class="profile-row">
	<div class="row-title">{{user.firstname}} {{user.lastname}}</div>
	<div class="profile-info">
		<div class="profile-photo">
			{{#if_not_null user.photo}}
				<img src="{{user.photo.url}}"/>
			{{/if_not_null}}
		</div>
		<div class="profile-details">
			<div class="primary-work">
				<div class="position">
					{{#if_not_null user.primaryWorkHistory}}
						{{#each user.primaryWorkHistory.jobs}}
							{{jobName}} 
						{{/each}}
					{{else}}
						Not Available
					{{/if_not_null}}
				</div>
				<div class="location">
					{{#if_not_null user.primaryWorkHistory}}
						{{user.primaryWorkHistory.employer.name}}
					{{else}}
						Not Available
					{{/if_not_null}}
				</div>
			</div>
			<div class="about">
				{{#if_not_null user.about}}
					{{user.about}}
				{{else}}
					Not Available
				{{/if_not_null}}	
			</div>
		</div>
	</div>
</div>
<div class="profile-row">
	<div class="row-title">Work History</div>
</div>