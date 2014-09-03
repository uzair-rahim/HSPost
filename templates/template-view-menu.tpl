<div class="user-info">
	{{#if_eq user.type "user"}}
		<div class="user-photo">
			{{#if_not_null user.photo}}
				<img src="{{user.photo.url}}"/>
			{{/if_not_null }}
		</div>
	{{else}}
		<div class="employer-logo">
			{{#ifEmployersHasLogo user selectedEmployer}}
				<img src="{{getEmployersLogo user selectedEmployer}}"/>
			{{/ifEmployersHasLogo}}
		</div>
	{{/if_eq}}	
	<div class="user-name">{{user.firstname}} {{user.lastname}}</div>
	{{#if_not_eq user.type "user"}}
		<div class="employer-name {{#if_gt user.employers.length 1}}more{{/if_gt}}">{{getEmployersName user selectedEmployer}}</div>
	{{/if_not_eq}}
	{{#if_gt user.employers.length 1}}
		<ul class="employers-list transition">
			{{#each user.employers}}
				{{#if_eq @index ../selectedEmployer}}
					<li class="selected">{{this.name}}</li>
				{{else}}
					<li>{{this.name}}</li>
				{{/if_eq}}
			{{/each}}
		</ul>
	{{/if_gt}}
</div>
<ul class="menu-list">
	<li id="menu-notifications">
		<label>Notifications</label>
		<div class="count">{{notificationsCount}}</div>
	</li>
	<li class="divider"></li>
	{{#if_not_eq user.type "user"}}
		<li id="menu-dashboard">
			<label>Dashboard</label>
		</li>
		<li class="divider"></li>
		<li id="menu-candidates">
			<label>Candidates</label>
		</li>
		<li id="menu-jobs">
			<label>Jobs</label>
		</li>
	{{/if_not_eq}}
	{{#if_eq user.type "user"}}
		<li id="menu-search-jobs">
			<label>Jobs</label>
		</li>
	{{/if_eq}}
	<li id="menu-network">
		<label>Network</label>
	</li>
	<li id="menu-profile">
		<label>Profile</label>
	</li>
	<li id="menu-messages">
		<label>Messages</label>
	</li>
	<li class="divider"></li>
	<li id="menu-settings">
		<label>Settings</label>
	</li>
	<li id="menu-logout">
		<label>Logout</label>
	</li>
	<li class="divider"></li>
</ul>