<div class="grid-list-title">{{network}}</div>
<ul class="grid-list">
	{{#if_eq users.length 0}}
		<li>
			<div class="column empty-list">You don't have any {{network}}</div>
		</li>
	{{/if_eq}}
</ul>