<div class="admin-info">
	<div class="employer-logo">
		{{#ifEmployersHasLogo user selectedEmployer}}
			<img src="{{getEmployersLogo user selectedEmployer}}"/>
		{{/ifEmployersHasLogo}}
	</div>
	<div class="user-name">{{user.firstname}} {{user.lastname}}</div>
	<div class="employer-name {{#if_gt user.employers.length 1}}more{{/if_gt}}">{{getEmployersName user selectedEmployer}}</div>
	{{#if_gt user.employers.length 1}}
		<ul class="employers-list transition">
			{{#each user.employers}}
				<li>{{this.name}}</li>
			{{/each}}
		</ul>
	{{/if_gt}}
</div>
<ul class="menu-list">
	<li id="menu-notifications">
		<label>Notifications</label>
		<div class="count">99+</div>
	</li>
	<li class="divider"></li>
	<li id="menu-jobs">
		<label>Jobs</label>
	</li>
	<li id="menu-candidates">
		<label>Candidates</label>
	</li>
	<li id="menu-network">
		<label>Network</label>
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