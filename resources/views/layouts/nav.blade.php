<!-- top navbar-->
<header class="topnavbar-wrapper">
    <!-- START Top Navbar-->
    <nav role="navigation" class="navbar topnavbar">
        <!-- START navbar header-->
        <div class="navbar-header">
            <a href="{{ url('/')}}" class="navbar-brand">
                <div class="brand-logo">
                    <img src="/img/logo.png" alt="{{ config('app.name') }}" class="img-responsive hide">
                    DriverApp
                </div>
            </a>
        </div>
        <!-- END navbar header-->

        <!-- START Nav wrapper-->
        <div class="nav-wrapper">
            <!-- START Left navbar-->
            <ul class="nav navbar-nav">
                <li>
                    <!-- Button used to collapse the left sidebar. Only visible on tablet and desktops-->
                    <a href="#" data-trigger-resize="" data-toggle-state="aside-collapsed" class="hidden-xs">
                        <em class="fa fa-navicon"></em>
                    </a>
                    <!-- Button to show/hide the sidebar on mobile. Visible on mobile only.-->
                    <a href="#" data-toggle-state="aside-toggled" data-no-persist="true"
                       class="visible-xs sidebar-toggle">
                        <em class="fa fa-navicon"></em>
                    </a>
                </li>
                <!-- START User avatar toggle-->
                <li>
                    <!-- Button used to collapse the left sidebar. Only visible on tablet and desktops-->
                    <a id="user-block-toggle" href="#user-block" data-toggle="collapse">
                        <em class="icon-user"></em>
                    </a>
                </li>
                <!-- END User avatar toggle-->
                <!-- START lock screen-->
                <li>
                    <a href="{{ url('/logout') }}"
                       onclick="event.preventDefault(); document.getElementById('logout-form').submit();"
                       title="Log out">
                        <em class="icon-logout"></em>
                    </a>
                    <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                        {{ csrf_field() }}
                    </form>
                </li>
                <!-- END lock screen-->
            </ul>
            <!-- END Left navbar-->
            <!-- START Right Navbar-->
            <ul class="nav navbar-nav navbar-right">
                <!-- Search icon-->
                <li>
                    <a href="#" data-search-open="">
                        <em class="icon-magnifier"></em>
                    </a>
                </li>
                <!-- Fullscreen (only desktops)-->
                <li class="visible-lg">
                    <a href="#" data-toggle-fullscreen="">
                        <em class="fa fa-expand"></em>
                    </a>
                </li>
            </ul>
            <!-- END Right Navbar-->
        </div>
        <!-- END Nav wrapper-->

        <!-- START Search form-->
        <form role="search" action="search.html" class="navbar-form">
            <div class="form-group has-feedback">
                <input type="text" placeholder="Type and hit enter ..." class="form-control">
                <div data-search-dismiss="" class="fa fa-times form-control-feedback"></div>
            </div>
            <button type="submit" class="hidden btn btn-default">Submit</button>
        </form>
        <!-- END Search form-->

    </nav>
    <!-- END Top Navbar-->
</header>

<!-- sidebar-->
<aside class="aside">
    <!-- START Sidebar (left)-->
    <div class="aside-inner">
        <nav data-sidebar-anyclick-close="" class="sidebar">
            <!-- START user info-->
            <li class="has-user-block">
                <div id="user-block" class="collapse">
                    <div class="item user-block">
                        <!-- User picture-->
                        <div class="user-block-picture">
                            <div class="user-block-status">
                                <img src="{{$user->avatar}}" alt="Avatar" width="60" height="60"
                                     class="img-thumbnail img-circle">
                                <div class="circle circle-success circle-lg"></div>
                            </div>
                        </div>
                        <!-- Name and Job-->
                        <div class="user-block-info">
                            <span class="user-block-name">Hello, {{ $user->username }}</span>
                            <span class="user-block-role">{{ $user->user_role }}</span>
                        </div>
                    </div>
                </div>
            </li>
            <!-- END user info-->

            <!-- START sidebar nav-->
        {{
            Element::navbar([
                'id' => 'aside_navbar',
                'user' => $user,
                'navigations' => $navigations,
                'active_navigation' => $active_navigation
            ])
        }}
        <!-- END sidebar nav-->
        </nav>
    </div>
    <!-- END Sidebar (left)-->
</aside>